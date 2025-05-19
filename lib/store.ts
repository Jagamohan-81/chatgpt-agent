import { create } from 'zustand';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  messages: ChatMessage[];
  selectedModel: string;
  addMessage: (msg: ChatMessage) => void;
  setSelectedModel: (model: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedModel: 'gpt-4o',
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
