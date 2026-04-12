import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";

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

while (true) {
  const userInput = await rl.question("\x1b[36mYou\x1b[0m: ");
  messages.push(userInput);

  const response = await model.invoke(messages);

  console.log("\n\x1b[33mMistralAI:\x1b[0m\n" + response.text + "\n");
  messages.push(response.text);
}
