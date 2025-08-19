import { useEffect, useRef } from 'react';
import { Message } from '@/app/types/types';
import MessageItem from './message-item';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto p-4 space-y-2 text-sm bg-white"
    >
      {messages.map((msg, i) => (
        <MessageItem key={i} message={msg} />
      ))}
    </div>
  );
}
