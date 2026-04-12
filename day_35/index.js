import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import readline from "readline/promises";
import * as z from "zod";
import { sendEmail, transporterReady } from "./services/mail.service.js";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send emails.",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const messages = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("==============================");
console.log(" MistralAI Chat Interface");
console.log(" Type your message and press Enter.");
console.log(" Press Ctrl+C to exit.");
console.log("==============================\n");

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

await transporterReady
  .then(() => console.log("Email transporter is ready to send emails"))
  .catch((error) => console.error("Error setting up email transporter:", error));

while (true) {
  const userInput = await rl.question("\x1b[36mYou\x1b[0m: ");
  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({ messages });

  messages.push(response.messages[response.messages.length - 1]);
  console.log(response.messages[response.messages.length - 1].content);
}
