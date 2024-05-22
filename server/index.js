const express = require('express');
const dotenv = require('dotenv');
const app = express();
const OpenAI = require('openai-api');
const axios = require('axios');

// Middleware to parse JSON bodies
app.use(express.json());

// Your OpenAI API key
const OPENAI_API_KEY = 'sk-proj-lEIm1wpEf4dchA6quuyqT3BlbkFJcjfwLxqX6TZRQLXqa17d';

// Endpoint to interact with ChatGPT
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;
    res.json({ response: chatResponse });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to communicate with OpenAI' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});