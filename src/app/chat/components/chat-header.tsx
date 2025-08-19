// components/ChatHeader.tsx
import Image from 'next/image';
import { Bot } from '@/app/types/types';
import { getImageFromBotSlug } from '@/app/utils/getImageFromBotSlug';
import BotDropdown from './bot-dropdown';

interface Props {
  activeBot: Bot;
  bots: Bot[];
  showDropdown: boolean;
  onSelectBot: (bot: Bot) => void;
  onToggleDropdown: () => void;
  onClose: () => void;
}

export default function ChatHeader({
  activeBot,
  bots,
  showDropdown,
  onSelectBot,
  onToggleDropdown,
  onClose,
}: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 relative">
      <button
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
        onClick={onToggleDropdown}
      >
        {activeBot && (
          <Image
            src={getImageFromBotSlug(activeBot.slug)}
            alt="chat avatar"
            className="w-12 h-12 rounded-full border object-cover"
          />
        )}
        <span className="font-medium">{activeBot.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showDropdown && <BotDropdown bots={bots} onSelectBot={onSelectBot} />}

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        ✕
      </button>
    </div>
  );
}
