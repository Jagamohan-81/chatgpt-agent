'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import ChatPage from './Chats'
export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState('gpt-4o')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage], model }),
    })
    const data = await res.json()
    setMessages([...messages, userMessage, data.reply])
    setLoading(false)
  }

  return (
    <ChatPage />
  )
}
