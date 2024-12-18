const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Load environment variables
dotenv.config();
app.use(express.json());
app.use(cors());

// Verify that the OpenAI API key is provided
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API Key in .env file");
    process.exit(1);
}

// OpenAI API Route for Image Generation
app.post('/api/generate-image', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "prompt" in request body' });
    }

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: prompt,
                n: 1,
                size: "512x512",
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Send the image URL back to the client
        res.status(200).json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate image. Please try again later." });
    }
});

// OpenAI API Route for Text Generation
app.post('/api/generate-text', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing "prompt" in request body' });
    }

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Use "gpt-4" if needed, depending on your requirements
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 150, // Adjust token limit as per your use case
                temperature: 0.7, // Adjust creativity level
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Send the generated text back to the client
        res.status(200).json({ text: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error generating text:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate text. Please try again later." });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
