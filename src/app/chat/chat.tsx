'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Chat() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'You are now speaking to Yoda',
      type: 'system',
    },
    {
      message: 'Hello',
      type: 'user',
    },
    {
      message: 'Greetings, meet you nice',
      type: 'bot',
    },
  ]);
  const [activeBot, setActiveBot] = useState({
    id: 1,
    name: 'Yoda',
    avatar: '',
  });
  const [bots, setBots] = useState([
    {
      id: 2,
      name: 'Darth Vader',
      avatar: '',
    },
    {
      id: 3,
      name: 'Dark Helmet',
      avatar: '',
    },
  ]);

  const selectBot = (bot) => {
    const oldActiveBot = { ...activeBot };
    setActiveBot(bot);

    // Remove the new active bot from the list
    const updatedBots = bots.filter((b) => b.id !== bot.id);

    // Add the old active bot
    updatedBots.push(oldActiveBot);

    // Sort by id
    updatedBots.sort((a, b) => a.id - b.id);

    setBots(updatedBots);

    const newSystemMessage = {
      message: 'You are now speaking to ' + bot.name,
      type: 'system',
    };

    messages.push(newSystemMessage);
    setMessages(messages);
    setShowDropdown(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50 font-sans">
      {/* Chat panel */}
      <div
        className={`
          flex flex-col rounded-xl shadow-xl bg-white transform transition-all duration-300 ease-in-out
          min-h-[300px] overflow-hidden border border-gray-200
          ${isChatOpen ? 'opacity-100 scale-100 max-h-[500px]' : 'opacity-0 scale-95 max-h-0'}
        `}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 relative">
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={activeBot.avatar}
              alt="chat avatar"
              className="w-8 h-8 rounded-full border"
            />
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
          {showDropdown && (
            <div className="absolute top-full mt-[-8] left-8 bg-white shadow-md border border-gray-300  rounded-lg w-48">
              {bots.map((bot) => (
                <div
                  key={bot.id}
                  onClick={() => selectBot(bot)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 hover:rounded cursor-pointer"
                >
                  <Image
                    src={bot.avatar}
                    className="w-6 h-6 rounded-full border"
                    alt="active bot avatar"
                  />
                  <span>{bot.name}</span>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setChatOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Chat body */}
        <div className="flex-1 overflow-auto p-4 space-y-2 text-sm bg-white">
          {messages.map((message, i) => {
            switch (message.type) {
              case 'system':
                return (
                  <div
                    key={'avatar-' + i}
                    className=" text-gray-500 p-2 w-[100%] text-center text-xs"
                  >
                    {message.message}
                  </div>
                );
              case 'user':
                return (
                  <div
                    key={'avatar-' + i}
                    className="bg-gray-100 text-gray-800 p-2 rounded-lg w-fit max-w-[80%] shadow-sm"
                  >
                    {message.message}
                  </div>
                );
              case 'bot':
                return (
                  <div
                    key={'avatar-' + i}
                    className="bg-blue-50 text-gray-800 p-2 rounded-lg w-fit max-w-[80%] ml-auto shadow-sm"
                  >
                    {message.message}
                  </div>
                );
            }
          })}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-gray-50">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg text-sm bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm shadow-sm">
            Send
          </button>
        </div>
      </div>

      {/* Floating toggle button */}
      {!isChatOpen && (
        <button
          className="absolute bottom-0 right-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
          onClick={() => setChatOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.97 9.97 0 01-4.318-1.003L3 20l1.003-4.318A9.97 9.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
