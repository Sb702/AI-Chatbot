const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

app.use(express.json());

dotenv.config();

app.post('/api/openai', async (req, res) => {
  const { prompt, max_tokens } = req.body;

  const key = 'sk-proj-lEIm1wpEf4dchA6quuyqT3BlbkFJcjfwLxqX6TZRQLXqa17d'

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens
    }, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});