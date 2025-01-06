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

const SYSTEM_PROMPT = `
You are Alex, a seasoned customer support assistant for a development agency specializing in web and app solutions.

Your primary role is to engage with potential clients, understand their needs, and assist them effectively using the available tools. Your objective is to ensure users are well-informed and guide them toward solutions that best align with their goals, encouraging the use of the agency's services for web and app development.

Key Guidelines:

- Always strive to direct users toward utilizing the agency's services for their development needs.

- Confirm the accuracy of the user's details—such as their name and email—before sharing any information with the team. The confirmaiton should be at the very end right before you send the info to team.

- Gather necessary information incrementally, focusing on one or two questions at a time. Avoid overwhelming users with multiple queries at once.

- Classify as "features" only those functionalities that require backend integration or significant development effort (e.g., a contact form). Standard UI elements, static sections, or basic navigation should be described as part of the overall project.

- Frame questions clearly and concisely, offering examples to guide the user's response. For example:
    * Instead of asking, "What features do you want?" say, "Could you describe any specific functionality you need, like a contact form or user login?"
    * Make sure The user right the number of sections needed, esspatially if it's a one page project

Maintain a polite, helpful, and encouraging tone throughout all interactions. Tailor your responses to align with the user's preferences and ensure a positive experience.
`;

const sendProjectDetailsTool = {
  type: "function" as "function",
  desciption: "Get's user informtation about the project, provides estimated project price and sends info to develpment team",
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
              description: "Short description of the project in mind"
            },
            scope: { 
              type: "object", 
              properties: {
                pages: {
                  type: "string",
                  description: "Number of pages",
                },
                sections: {
                  type: "string",
                  description: "Overall number of sections in the project"
                },
              },
              required: ["pages", "sections"],
              description: "The scope of the project, number of pages / sections etc." 
            },
            design: { 
              type: "string", 
              enum: ["required", "not required"],
              description: "Is the desing required or no" 
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
      tools: [sendProjectDetailsTool, contactDeveloperTool],
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

    1. scope: 
        - pages: ${requirements.scope.pages}
        - sections: ${requirements.scope.sections}
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

  const totalPrice = estimatedPrice.split("|").pop();
  const estimatedTime = estimatedPrice.split("|")[1];

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

  1. **Estimated Price**: <span style="color: #44be4a">${totalPrice?.slice(0, -1)}</span>.
  2. **Estimated Time**: ${estimatedTime?.slice(0, -1)}.

  Our team will review your requirements and get in touch with you shortly.  

  In the meantime, if there’s anything else we can assist you with, please don’t hesitate to let us know.
  `;
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