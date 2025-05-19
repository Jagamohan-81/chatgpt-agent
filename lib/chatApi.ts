import { useMutation } from '@tanstack/react-query';
import { useChatStore } from './store';

async function postMessageToAPI(
  userMessage: string,
  messages: { role: string; content: string }[],
  model: string
) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages,
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to send message');
  }

  return res.json();
}

export function useSendMessage() {
  const addMessage = useChatStore((state) => state.addMessage);
  const model = useChatStore((state) => state.selectedModel);
  const messages = useChatStore((state) => state.messages);
  const setError = useChatStore((state) => state.setError);
  const clearError = useChatStore((state) => state.clearError);
  const errorMessage = useChatStore((state) => state.errorMessage);

  return useMutation({
    mutationFn: (userMessage: string) =>
      postMessageToAPI(userMessage, messages, model),
    onMutate: (userMessage: string) => {
      addMessage({ role: 'user', content: userMessage });
    },
    onSuccess: (data) => {
      addMessage({ role: 'assistant', content: data.reply.content });
      clearError();
    },
    onError: (error) => {
      console.error('Chat API error:', error);
      setError(error.message);
    },
  });
}
