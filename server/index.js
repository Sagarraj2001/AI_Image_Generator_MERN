const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Configurations
dotenv.config();
app.use(express.json());
app.use(cors());

// OpenAI API Route
app.post('/api/generate-image', async (req, res) => {
    const { prompt } = req.body;
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
        res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error("Error generating image:", error.message);
        res.status(500).send("Failed to generate image");
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
