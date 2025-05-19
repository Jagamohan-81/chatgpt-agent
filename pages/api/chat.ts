import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const defaultSystemPrompt = {
  role: 'system',
  content: 'You are a helpful and professional AI assistant. Keep your answers clear, friendly, and structured. Always ask follow-up questions if needed.',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, model } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' })
  }

  try {
    const messagesWithSystem = [defaultSystemPrompt, ...messages]

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-4o',
      messages: messagesWithSystem,
    })

    const reply = completion.choices[0].message
    console.log('OpenAI API response:', completion)
    return res.status(200).json({
      reply,
      model: model || 'gpt-4o',
    })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return res.status(500).json({
      error: 'Something went wrong while generating a response',
      details: error?.message || null,
    })
  }
}
