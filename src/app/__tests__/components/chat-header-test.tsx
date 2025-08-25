// src/app/__tests__/components/bot-dropdown.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BotDropdown from '@/app/chat/components/bot-dropdown';

jest.mock('@/app/utils/getImageFromBotSlug', () => ({
  getImageFromBotSlug: (slug: string) => `/images/${slug}.png`,
}));

// ----- Mock next/image -----
jest.mock('next/image', () => {
  return ({ src, alt, ...rest }: any) => {
    // Render a plain <img> and forward src explicitly
    return <img src={src} alt={alt} {...rest} />;
  };
});


describe('BotDropdown', () => {
  const bots = [
    { slug: 'bot-1', name: 'Bot One' },
    { slug: 'bot-2', name: 'Bot Two' },
  ];

  const onSelectBot = jest.fn();

  beforeEach(() => onSelectBot.mockClear());

  it('renders all bot names', () => {
    render(<BotDropdown bots={bots} onSelectBot={onSelectBot} />);
    // @ts-ignore
    bots.forEach(bot => expect(screen.getByText(bot.name)).toBeInTheDocument());
  });

  it('calls onSelectBot when a bot is clicked', () => {
    render(<BotDropdown bots={bots} onSelectBot={onSelectBot} />);
    const firstBot = screen.getByText('Bot One').parentElement!;
    fireEvent.click(firstBot);
    expect(onSelectBot).toHaveBeenCalledWith(bots[0]);
  });

  it('renders images with correct src', () => {
    render(<BotDropdown bots={bots} onSelectBot={onSelectBot} />);
    const imgs = screen.getAllByAltText('bot avatar') as HTMLImageElement[];

    expect(imgs[0].getAttribute('src')).toBe('/images/bot-1.png');
    expect(imgs[1].getAttribute('src')).toBe('/images/bot-2.png');
  });
});
