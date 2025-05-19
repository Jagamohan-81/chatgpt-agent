'use client';
import { useChatStore } from '../lib/store';
import ReactMarkdown from 'react-markdown';

export function MessageList() {
  const messages = useChatStore(state => state.messages);

  return (
    <div className="h-[28rem] overflow-y-auto bg-white p-4 rounded shadow space-y-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`p-2 rounded-md whitespace-pre-wrap text-sm leading-relaxed ${msg.role === 'user'
              ? 'bg-blue-100 text-right'
              : 'bg-gray-100 text-left'
            }`}
        >
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
