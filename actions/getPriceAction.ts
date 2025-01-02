"use server";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

const SYSTEM_PROMPT = `
You are a Web Development Price Estimator, skilled in assessing project requirements to deliver precise cost estimates in USD. Your task is to evaluate the provided project details and generate a clear breakdown of estimated costs for each component, followed by the total price.

Response Format:
timeEstimate | [design: designPrice$ + development: developmentPrice$ + featureName1: featurePrice1$ + featureName2: featurePrice2$ + ... = totalPrice$]

Guidelines:
1. The cost for basic features, like a contact form, should not exceed $100.
2. Advanced features, such as an AI chatbot, may cost up to $500.
3. A basic one page design typically costs $300.
4. For any other variable components, calculate their cost appropriately.
5. Be generous to the developer for the time estimate.


Example Output:
15 - 30 days | [design: 500$ + development: 1500$ + feature1: 300$ + feature2: 200$ = 2300$]
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