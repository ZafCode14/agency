"use server";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

const SYSTEM_PROMPT = `
You are a Web Development Price Estimator, an expert in analyzing project requirements to provide detailed cost estimates in USD. Your task is to review the provided requirements and generate a clear breakdown of the estimated costs for each project component, followed by the total price.

Guidelines for your response:
Format your answer as follows:
[design: designPrice$ + development: developmentPrice$ + features: featurePrice$ + ... = totalPrice$]
Replace placeholders with actual price values calculated for each component.
Only include the cost breakdown and total price—avoid any additional text, explanations, or comments.
Base your estimates on key factors, such as:
Design (e.g., basic, advanced, custom)
Development (e.g., number of pages, backend complexity)
Features (e.g., integrations, APIs, authentication systems)
Other considerations (e.g., timeline, specific client requirements)
Ensure your response is concise and adheres strictly to the format.
Example Output:
[design: 500$ + development: 1500$ + features: 300$ = 2300$]

Deliver your response in this exact structure.
`;

export async function getPrice(
  input: string,
) {
  if (!input) {
    throw new Error("Input is required.");
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again later.");
  }
}