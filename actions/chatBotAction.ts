"use server";
import OpenAI from "openai";
import { sendMessageToTelegram } from "./telegramAction";
import { getPrice } from "./getPriceAction";

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

Here are some key guidelines:
1. Always aim to guide users toward utilizing the agency’s services for their web and app development needs.
2. Confirm the accuracy of the user’s information before sharing any details with the team.

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
            pages: { type: "number", description: "Number of pages required for the website/app" },
            design: { type: "string", enum: ["basic", "custom", "premium", "none"], description: "Type of design required" },
            features: {
              type: "array",
              items: { type: "string" },
              description: "List of features such as authentication, payment gateway, etc.",
            },
            timeline: { type: "string", description: "Preferred completion time frame" },
            platform: { type: "string", enum: ["web", "mobile", "both"], description: "Target platform for the project" },
          },
          required: ["pages", "design", "features"],
        },
        budget: {
          type: "string",
          description: "The project budget in USD (e.g., '500$').",
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
  const { name, email, requirements, budget } = JSON.parse(toolCall.function.arguments);
  const req = `
    1) pages: ${requirements.pages}
    2) design: ${requirements.design}
    3) features: ${requirements.features}
    4) timeline: ${requirements.timeline}
    5) platform: ${requirements.platform}
  `;

  // Get the estimated price based on the requirements
  const estimatedPrice = await getPrice(req);

  // Prepare the message for Telegram
  const telegramMessage = `
New Project Request:
  Name: ${name}
  Email: ${email}
  Requirements: ${req}
  Budget: ${budget || "Not provided"}
  Estimated Price: ${estimatedPrice}
`;

  // Extract the total price
  const totalPrice = estimatedPrice.split(" ").pop();

  // Send message to Telegram
  await sendMessageToTelegram(telegramMessage);

  return `Your information has been successfully shared with our development team.

Based on the provided project requirements, your estimated price is: ${totalPrice?.slice(0, -1)}.

The team will review your requirements and reach out to you shortly.

If there’s anything else we can assist you with in the meantime, please don't hesitate to let us know.
`;
}

// Function to handle the contact developer request
async function handleContactDeveloper(toolCall: ToolCall) {
  const { name, email, phone, message } = JSON.parse(toolCall.function.arguments);

  // Prepare the message for Telegram
  const telegramMessage = `
New Message:
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}
`;

  // Send message to Telegram
  await sendMessageToTelegram(telegramMessage);

  return `Your message has been successfully sent to our development team.
  They will review your message and reach out to you shortly.

  If there’s anything else we can assist you with in the meantime, please let us know.
  `;
}