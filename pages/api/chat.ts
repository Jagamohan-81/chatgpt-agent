import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again after 15 minutes.',
  handler: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const defaultSystemPrompt = {
  role: 'system',
  content: "You are a helpful and professional AI assistant.include anotation 'hello im jagamohans personal ai agent', Keep your answers clear, friendly, and structured. Always ask follow-up questions if needed.",
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await new Promise<void>((resolve, reject) => {
    apiLimiter(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  }).catch(error => {
    console.error('Rate limiter error:', error);
    if (!res.headersSent) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
  });

  const { messages, model } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    const messagesWithSystem = [defaultSystemPrompt, ...messages];

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4o',
      messages: messagesWithSystem,
    });

    const reply = completion.choices[0].message;
    console.log('OpenAI API response:', completion);

    return res.status(200).json({
      reply,
      model: model || 'gpt-4o',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('OpenAI API error:', errorMessage);
    return res.status(500).json({
      error: 'Something went wrong while generating a response',
      details: errorMessage,
    });
  }
}