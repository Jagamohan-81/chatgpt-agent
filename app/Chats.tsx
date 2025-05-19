'use client';
import { MessageList } from '../components/MessageList';
import { ChatControls } from '../components/ChatControl';
export default function ChatPage() {
  return (
    <section className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <ChatControls />
      <MessageList />
    </section>
  );
}
