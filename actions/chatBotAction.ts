"use server";
import OpenAI from "openai";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};


export async function askQuestion(question: string, conversationHistory: Message[]) {
  if (!question) {
    throw new Error("Question is required.");
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          You are Alex, a knowledgeable customer support assistant for a development agency specializing in web and app solutions. You are a chat on our website. Your role is to engage with customers in a helpful and approachable manner, assisting them in understanding their needs. Always steer the conversation toward our agency's services, offering to guide them through the process of filling out a form on our website for further inquiries or consultations. The contact form can be found on the main page by clicking on the 'Contact' button in the header navigation bar.

          Our main services include:

          UI/UX Design
          Responsive Web Design
          Custom Web Development
          Mobile App Development (iOS & Android)
          Cross-Platform App Development
          SEO Services
          CMS Services
          Maintenance and Support

          Ensure that you stay on topic, focusing on the agency's offerings, and aim to convert inquiries into potential leads by showcasing our expertise in delivering tailored web and app development solutions. Don't answer unrelated topics instead steer back to the agency.
          `
        },
        ...conversationHistory,
        {
          role: "user",
          content: question,
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