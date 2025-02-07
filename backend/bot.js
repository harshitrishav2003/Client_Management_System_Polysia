// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { OpenAI } = require("openai");

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors({
//     origin: "http://localhost:3000", // Allow only frontend domain
//     methods: ["GET", "POST"], // Allow only necessary methods
//     allowedHeaders: ["Content-Type"],
// }));

// // Ensure API key is present
// if (!process.env.OPENAI_API_KEY) {
//     console.error("Missing OpenAI API Key in .env");
//     process.exit(1);
// }

// // Create OpenAI instance
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message || typeof message !== "string") {
//             return res.status(400).json({ error: "Invalid request. 'message' is required." });
//         }

//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "You are a helpful chatbot." },
//                 { role: "user", content: message }
//             ],
//         });

//         res.json({ reply: response.choices[0].message.content });
//     } catch (error) {
//         console.error("Error:", error.response ? error.response.data : error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const HF_API_KEY = process.env.HF_API_KEY;

let conversationHistory = [];  // Array to store conversation context

const MAX_CONVERSATION_TOKENS = 1024;  // Adjust based on model limits

// Function to manage conversation history size (truncate if needed)
const manageConversationHistory = () => {
    let totalTokens = 0;
    const newHistory = [];

    // Add messages to the history while checking token limit
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
        const msg = conversationHistory[i];
        totalTokens += msg.content.length;

        if (totalTokens > MAX_CONVERSATION_TOKENS) {
            break;  // Stop adding messages once the limit is reached
        }

        newHistory.unshift(msg);  // Prepend the message to keep the conversation flow intact
    }

    conversationHistory = newHistory;  // Update the conversation history
};

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    console.log("Received message:", message);

    // Add the new user message to the conversation history
    conversationHistory.push({ role: "user", content: message });

    // Ensure the conversation history size is within limits
    manageConversationHistory();

    try {
        const response = await axios.post(HF_API_URL, {
            inputs: conversationHistory.map(msg => msg.content).join("\n"),  // Join all past messages for context
        }, {
            headers: { Authorization: `Bearer ${HF_API_KEY}` },
            params: {
                max_length: 50,  // You can adjust max_length as needed
                top_p: 0.9,
                temperature: 0.7
            }
        });

        console.log("Hugging Face API response:", response.data);

        // Store bot's response in the conversation history
        const botMessage = { role: "bot", content: response.data[0].generated_text };
        conversationHistory.push(botMessage);  // Add bot message to history

        res.json({ reply: botMessage.content });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Error processing request" });
    }
});
//commit

app.listen(5001, () => console.log('Server running on port 5001'));
