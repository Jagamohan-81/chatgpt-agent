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
  errorMessage: string | null;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedModel: 'gpt-4o',
  addMessage: (msg) => set((state) => ({ messages: [msg, ...state.messages] })),
  setSelectedModel: (model) => set({ selectedModel: model }),
  errorMessage: null,
  setError: (error) => set(() => ({ errorMessage: error })),
  clearError: () => set(() => ({ errorMessage: null })),
}));
