
const express = require('express');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
app.use(express.json()); 

const API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b-it";
const HF_TOKEN = process.env.HF_TOKEN; 

app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        
        console.log("--- DEBUG INFO ---");
        console.log("API URL being called:", API_URL);
        console.log("HF_TOKEN is:", HF_TOKEN ? `Loaded (${HF_TOKEN.substring(0, 10)}...)` : "!!! UNDEFINED !!!");
        console.log("--------------------");

        console.log(`Received prompt: ${prompt}`);

        const response = await axios.post(
            API_URL,
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${HF_TOKEN}`,
                },
            }
        );

        const generatedText = response.data[0].generated_text;

        console.log(`Received response: ${generatedText}`);

        res.json({ response: generatedText });

    } catch (error) {
        console.error('Error calling Hugging Face API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from AI model.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});