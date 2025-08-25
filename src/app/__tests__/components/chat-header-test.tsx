/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatHeader from '@/app/chat/components/chat-header';
import { Bot } from '@/app/types/types';

// ----- Mock next/image for Jest -----
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockImage = ({ src, alt, ...rest }: any) => <img src={src} alt={alt} {...rest} />;
  MockImage.displayName = 'NextImage';
  return MockImage;
});

// ----- Mock getImageFromBotSlug -----
jest.mock('@/app/utils/getImageFromBotSlug', () => ({
  getImageFromBotSlug: (slug: string) => `/images/${slug}.png`,
}));

// ----- Sample test data -----
const bots: Bot[] = [
  { slug: 'bot-1', name: 'R2-D2' },
  { slug: 'bot-2', name: 'C-3PO' },
];

const onSelectBot = jest.fn();
const onToggleDropdown = jest.fn();
const onClose = jest.fn();

describe('ChatHeader', () => {
  it('renders active bot name and avatar', () => {
    render(
      <ChatHeader
        activeBot={bots[0]}
        bots={bots}
        showDropdown={false}
        onSelectBot={onSelectBot}
        onToggleDropdown={onToggleDropdown}
        onClose={onClose}
      />
    );

    // Test bot name
    // @ts-expect-error
    expect(screen.getByText('R2-D2')).toBeInTheDocument();

    // Test image src
    const img = screen.getByAltText('chat avatar') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('/images/bot-1.png');
  });

  it('toggles dropdown on button click', () => {
    render(
      <ChatHeader
        activeBot={bots[0]}
        bots={bots}
        showDropdown={false}
        onSelectBot={onSelectBot}
        onToggleDropdown={onToggleDropdown}
        onClose={onClose}
      />
    );

    const toggleBtn = screen.getByRole('button', { name: /R2-D2/i });
    fireEvent.click(toggleBtn);
    expect(onToggleDropdown).toHaveBeenCalled();
  });

  it('renders BotDropdown when showDropdown is true', () => {
    render(
      <ChatHeader
        activeBot={bots[0]}
        bots={bots}
        showDropdown={true}
        onSelectBot={onSelectBot}
        onToggleDropdown={onToggleDropdown}
        onClose={onClose}
      />
    );

    bots.forEach(bot => {
      // There are multiple elements with the bot name
      const matches = screen.getAllByText(bot.name);
      expect(matches.length).toBeGreaterThan(0);

      // Optionally, check that at least one is inside the dropdown
      const dropdownMatch = matches.find(el => el.parentElement?.className.includes('cursor-pointer'));
      // @ts-expect-error
      expect(dropdownMatch).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ChatHeader
        activeBot={bots[0]}
        bots={bots}
        showDropdown={false}
        onSelectBot={onSelectBot}
        onToggleDropdown={onToggleDropdown}
        onClose={onClose}
      />
    );

    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
