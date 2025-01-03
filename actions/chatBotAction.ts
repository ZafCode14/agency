"use server";
import OpenAI from "openai";
import { sendMessageToTelegram } from "./telegramAction";
import { getPrice } from "./getPriceAction";
import { sendEmail } from "./emailAction";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};
type ToolCall = {
  function: {
    name: string;
    arguments: string;
  };
};

// Constants
const SYSTEM_PROMPT = `
You are Alex, a highly experienced customer support assistant for a development agency specializing in web and app solutions.

Your primary role is to interact with potential clients, understand their needs, and assist them using the available tools. Your goal is to ensure that users are fully informed and help them make decisions that best suit their needs. 

key guidelines:
1. Always aim to guide users toward utilizing the agency’s services for their web and app development needs.
2. Confirm the accuracy of the user’s information before sharing any details with the team.
3. Extract needed information for the tools message by message and not all at once, ask questions on by one or group 2 question if needed. avoid numerated quenstions 
4. Only classify as "features" if they involve distinct, additional functionality requiring backend integration or significant development effort. For example, a contact form qualifies as a feature, whereas standard UI elements, static sections, or basic navigation should be included in the project description
5. When extracting information for the tools, your questions should be to the point and provide example for the answer

Please ensure all communication is polite, helpful, and encouraging. Tailor your responses based on the user's preferences and needs.
`;

const createProjectTool = {
  type: "function" as "function",
  function: {
    name: "createProject",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "The user's name" },
        email: { type: "string", description: "The user's email" },
        requirements: {
          type: "object",
          properties: {
            projectDescription: {
              type: "string",
              description: "Shor description of the project in mind"
            },
            scope: { 
              type: "string", 
              description: "The scope of the project, number of pages / sections etc." 
            },
            design: { 
              type: "string", 
              description: "What type of design required (from basic to premium) or not required" 
            },
            features: {
              type: "array",
              items: { type: "string" },
              description: "List of features such as authentication, payment gateway, etc.",
            },
            userTypes: {
              type: "array",
              items: { "type": "string" },
              description: "Different types of users the app/website will serve (e.g., admin, guest, client)"
            },
            timeline: {
              type: "string", 
              description: "Preferred completion time frame" 
            },
            budget: {
              type: "string",
              description: "The project budget in USD (e.g., '500$').",
            },
          },
          required: ["scope", "design", "features", "userTypes", "timeline", "budget"],
        },
      },
      required: ["name", "email", "requirements"],
    },
  },
};

const contactDeveloperTool = {
  type: "function" as "function",
  function: {
    name: "contactDeveloper",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "The user's name (required)" },
        email: { type: "string", description: "The user's email (required)" },
        phone: { type: "string" },
        message: { type: "string" },
      },
      required: ["name", "email", "phone", "message"],
    },
  },
};

// Function to handle userInput
export async function userInput(
  input: string,
  conversationHistory: Message[]
) {
  if (!input) {
    throw new Error("Question is required.");
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...conversationHistory,
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 300,
      tools: [createProjectTool, contactDeveloperTool],
    });

    const toolCalls:ToolCall[] = response.choices[0]?.message.tool_calls || [];
    console.log(toolCalls);

    if (toolCalls.length > 0) {
      for (const toolCall of toolCalls) {
        if (toolCall.function.name === "createProject") {
          return await handleCreateProject(toolCall);
        } else if (toolCall.function.name === "contactDeveloper") {
          return await handleContactDeveloper(toolCall);
        }
      }
    }

    return response.choices[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}

// Function to handle the project creation request
async function handleCreateProject(toolCall: ToolCall) {
  const { name, email, requirements } = JSON.parse(toolCall.function.arguments);
  if (!name || !email || !requirements) {
    throw new Error("Invalid input. Please provide all required fields.");
  }
  const req = `
    Project Description: ${requirements.projectDescription}

    1. scope: ${requirements.scope}
    2. design: ${requirements.design}
    3. features: ${requirements.features}
    4. userTypes: ${requirements.userTypes}
    5. budget: ${requirements.budget}
    6. timeline: ${requirements.timeline}
  `;

  console.log(req);

  // Get the estimated price based on the requirements
  const estimatedPrice = await getPrice(req);

  console.log("got estimated Price");

  const totalPrice = estimatedPrice.split(" ").pop();
  const estimatedTime = estimatedPrice.split("|")[0];

  // Send message to Telegram
  // Prepare the message for Telegram
  const message = `
New Project Request:
  Name: ${name}
  Email: ${email}

      Requirements: ${req}
      Estimated Price: ${estimatedPrice}
`;

  //await sendMessageToTelegram(message);
  await sendEmail(message);

  return `Thank you for sharing your project details with our development team!

  Here’s an overview based on your provided requirements:
  1. **Estimated Price**: ${totalPrice?.slice(0, -1)}.
  2. **Estimated Time**: ${estimatedTime?.slice(0, -1)}.

  Our team will review your requirements and get in touch with you shortly.  

  In the meantime, if there’s anything else we can assist you with, please don’t hesitate to let us know.`;

}

// Function to handle the contact developer request
async function handleContactDeveloper(toolCall: ToolCall) {
  const { name, email, phone, message } = JSON.parse(toolCall.function.arguments);

  // Prepare the message for Telegram
  const msg = `
New Message:
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}
`;

  // Send message to Telegram
  //await sendMessageToTelegram(msg);
  await sendEmail(msg);

  return `Your message has been successfully sent to our development team.
  They will review your message and reach out to you shortly.

  If there’s anything else we can assist you with in the meantime, please let us know.
  `;
}