import { Message } from '@/app/types/types';

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  switch (message.type) {
    case 'system':
      return (
        <div className="text-gray-500 p-2 w-[100%] text-center text-xs">
          {message.message}
        </div>
      );
    case 'user':
      return (
        <div className="bg-blue-50 text-gray-800 p-2 rounded-lg w-fit max-w-[80%] ml-auto shadow-sm">
          {message.message}
        </div>
      );
    case 'bot':
      return (
        <div className="bg-gray-100 text-gray-800 p-2 rounded-lg w-fit max-w-[80%] shadow-sm">
          {message.message}
        </div>
      );
  }
}
