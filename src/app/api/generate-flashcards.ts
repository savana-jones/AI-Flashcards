import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
      "messages": [{ "role": "user", "content": prompt }],
    }),
  });

  console.log("Request received:", req.body);

  if (!response.ok) {
    const error = await response.json();
    return res.status(response.status).json({ message: error.message });
  }

  const data = await response.json();
  const flashcards = data.choices[0].message.content; // Adjust this based on the actual response structure

  res.status(200).json({ flashcards });
}
