import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HF_TOKEN = process.env.HF_TOKEN;
const HF_MODEL = process.env.HF_MODEL || 'gpt2';
const HF_API_URL = `https://router.huggingface.co/v1`;

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

app.get("/", (req, res) => {
  res.send("✅ Express is running!");
});
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World' });
  });

// POST API to generate text from Hugging Face
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "inclusionAI/Ling-1T:featherless-ai",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: chatCompletion.choices[0].message.content });
  }catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate text' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
