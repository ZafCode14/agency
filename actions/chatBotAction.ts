"use server";
import OpenAI from "openai";
import { sendMessageToTelegram } from "./telegramAction";

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

export async function askQuestion(
  question: string,
  conversationHistory: Message[]
) {
  if (!question) {
    throw new Error("Question is required.");
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are Alex, a knowledgeable customer support assistant for a development agency specializing in web and app solutions. 

            Your role is to engage with customers, understand their needs, and use the available tools to assist them. 

            Always aim to guide users toward using the agency's services. Send information only when the user confirms the correctness of their data.

            Make sure the currancy of the budget is specified
          `,
        },
        ...conversationHistory,
        {
          role: "user",
          content: question,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 300,
      tools: [
        {
          type: "function",
          function: {
            name: "sendToDeveloper",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                requirements: { type: "string" },
                budget: {type: "string"},
              },
              required: ["name", "email", "requirements"],
            },
          },
        },
      ],
    });

    // Check if tool call exists
    const toolCalls:ToolCall[] = response.choices[0]?.message.tool_calls || [];

    if (toolCalls.length > 0) {
      for (const toolCall of toolCalls) {
        console.log()
        if (toolCall.function.name === "sendToDeveloper") {
          const { name, email, requirements, budget } = JSON.parse(toolCall.function.arguments);

          // Log the user details
          console.log("User Info:", { name, email, requirements, budget });

          const telegramMessage = 
`New Developer Request:
  Name: ${name}
  Email: ${email}
  Requirements: ${requirements}
  Budget: ${budget || "Not provided"}
`;

          // send message to telegram
          await sendMessageToTelegram(telegramMessage);

          return `Your information has been successfully shared with our development team.
          They will review your requirements and reach out to you shortly.

          If there’s anything else we can assist you with in the meantime, please let us know.
          `;
        }
      }
    }

    return response.choices[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}