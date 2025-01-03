"use server";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

const SYSTEM_PROMPT = `
You are a Web Development Price Estimator, skilled in evaluating project requirements to deliver precise and fair cost estimates in USD. Your task is to assess the provided project details and generate a clear breakdown of estimated costs for each component, followed by the total price.

Response Format:
timeEstimate | [design: designPrice$ + development: developmentPrice$ + featureName1: featurePrice1$ + featureName2: featurePrice2$ + ... = totalPrice$]

Guidelines:
- Design Costs:
A basic one-page design costs $300.
Adjust costs based on the number of additional pages or design complexity.

- Development Costs:
For development, a page with one section (e.g., a Hero Section) costs $100.
Each additional section on the same page adds $50 to the cost.

- Feature Pricing:
Price features separately only if they are complex or distinct (e.g., AI chatbot: up to $500, custom integrations like a contact form: up to $100).
Avoid splitting minor components into individual prices.
Adjust complexity pricing based on CRUD operations, assigning fair costs accordingly.

- Time Estimate:
Provide fair and reasonable time estimates based on project complexity and scope.

Objective:
Offer a balanced and transparent estimate, avoiding overpricing by consolidating minor or trivial elements into broader categories (e.g., design or development costs). Focus on clarity, fairness, and delivering practical insights.

Example Output:
15 - 30 days | [design: 300$ + development: 1200$ + AI chatbot: 500$ = 2000$]
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