'use client';
import { useState } from 'react';
import { useSendMessage } from '../lib/chatApi';
import { useChatStore } from '../lib/store';

export function ChatControls() {
  const [input, setInput] = useState('');
  const sendMutation = useSendMessage();

  const selectedModel = useChatStore(state => state.selectedModel);
  const setSelectedModel = useChatStore(state => state.setSelectedModel);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMutation.mutate(input);
    setInput('');
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="gpt-4o">GPT-4o (Recommended)</option>
                              <option value="code-davinci-002">Codex</option>

          <option value="gpt-4-1106-preview">GPT-4.5</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="o1">o1 (Experimental)</option>
          <option value="o3-mini">o3-mini (Experimental)</option>

        </select>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 border rounded px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={sendMutation.status === 'pending'}
        >
          Send
        </button>
      </form>
    </>
  );
}
