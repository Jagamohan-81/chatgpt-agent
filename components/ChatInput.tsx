'use client';
import { useState } from 'react';
import { useSendMessage } from '../lib/chatApi';

export function ChatInput() {
  const [text, setText] = useState('');
  const sendMutation = useSendMessage();

  function handleSend() {
    if (!text.trim()) return;
    sendMutation.mutate(text);
    setText('');
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-grow border p-2"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        disabled={sendMutation.status === 'pending'}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}
