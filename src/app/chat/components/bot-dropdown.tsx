// components/BotDropdown.tsx
import Image from 'next/image';
import { Bot } from '@/app/types/types';
import { getImageFromBotSlug } from '@/app/utils/getImageFromBotSlug';

interface Props {
  bots: Bot[];
  onSelectBot: (bot: Bot) => void;
}

export default function BotDropdown({ bots, onSelectBot }: Props) {
  return (
    <div className="absolute top-full left-8 bg-white shadow-md border border-gray-300 rounded-lg w-60 z-10">
      {bots.map((bot) => (
        <div
          key={bot.slug}
          onClick={() => onSelectBot(bot)}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 hover:rounded cursor-pointer"
        >
          <Image
            src={getImageFromBotSlug(bot.slug)}
            alt="bot avatar"
            className="w-12 h-12 rounded-full border mr-2 object-cover"
          />
          <span>{bot.name}</span>
        </div>
      ))}
    </div>
  );
}
