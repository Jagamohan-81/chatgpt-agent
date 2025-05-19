'use client';
import { MessageList } from '../components/MessageList';
import { ChatControls } from '../components/ChatControl';
import { useChatStore } from '@/lib/store';

export default function ChatPage() {
  const errorMessage = useChatStore((state) => state.errorMessage);

  return (
    <section className="w-full max-w-2xl mx-auto p-4 space-y-4">
      

      <ChatControls />
      {
        errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <strong>Error:</strong> {errorMessage}
          </div>
        )
      }
      <MessageList />
    </section>
  );
}
