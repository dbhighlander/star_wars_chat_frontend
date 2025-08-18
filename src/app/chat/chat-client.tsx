// components/ChatClient.tsx
"use client";

import { useEffect, useState } from "react";
import { Bot, Message } from "../types";
import ChatHeader from "./components/chat-header";
import MessageList from "./components/message-list";
import ChatInput from "./components/chat-input";
import ChatToggleButton from "./components/chat-toggle-button";
import { createChat } from "../lib/createChat";
import { sendMessage } from "@/app/lib/sendMessage";
import { assignBotToChat } from "../lib/assignBotToChat";

interface Props {
  bots: Bot[];
  messages: Message[];
  activeBotSlug: string;
}

export default function ChatClient({ bots: initialBots, messages: initialMessages, activeBotSlug }: Props) {
  const [isChatOpen, setChatOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeBot, setActiveBot] = useState<Bot>({ slug: "", name: ""});
  const [bots, setBots] = useState<Bot[]>([]);
  const [customerMessage, setCustomerMessage] = useState("");

  useEffect(() => {
    if (initialMessages.length > 0 && activeBotSlug !== "") {
      setMessages(initialMessages);
      loadActiveBot(initialBots, activeBotSlug);
      setChatOpen(true);
    } else {
      setBots(initialBots);
    }
  }, []);

  const startChat = async () => {
    const defaultChatterSlug = "yoda";
    loadActiveBot(bots, defaultChatterSlug);
    const chatData = await createChat(defaultChatterSlug);
    setMessages(chatData.messages);
    setChatOpen(true);
  };

  const closeChat = async () => {

    const closeChatbot = window.confirm("Do you wish to end this chat?");

    if(!closeChatbot){
      return false
    }
    let newBots = [...bots]
    newBots.push(activeBot)
    setBots(newBots)
    setShowDropdown(false);
    setChatOpen(false);
  };

  const loadActiveBot = (bots: Bot[], activeBotSlug: string) => {
    const newBots: Bot[] = [];
    let selected: Bot | null = null;

    bots.forEach((b) => {
      if (b.slug === activeBotSlug) {
        selected = b;
      } else {
        newBots.push(b);
      }
    });

    setActiveBot(selected ?? { slug: "", name: "" });
    setBots(newBots);
  };

  const selectBot = async(bot: Bot) => {

    const systemMessage = await assignBotToChat(bot.slug)
    
    const oldActiveBot = { ...activeBot };
    setActiveBot(bot);

    const updatedBots = bots.filter((b) => b.slug !== bot.slug);
    if (oldActiveBot.slug) {
      updatedBots.push(oldActiveBot);
    }
    setBots(updatedBots);

    setMessages([...messages, { message: systemMessage, type: "system" }]);
    setShowDropdown(false);
  };

  const sendMessageHandler = async () => {
    if (!customerMessage.trim()) return;

    const response = await sendMessage(customerMessage);
    const newCustomerMessage: Message = { message: response.customer_message, type: "user" };

    setMessages([...messages, newCustomerMessage]);
    setCustomerMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50 font-sans">
      {/* Chat panel */}
      <div
        className={`
          flex flex-col rounded-xl shadow-xl bg-white transform transition-all duration-300 ease-in-out
          min-h-[300px] overflow-hidden border border-gray-200
          ${isChatOpen ? "opacity-100 scale-100 max-h-[500px]" : "opacity-0 scale-95 max-h-0"}
        `}
      >
        {isChatOpen && (
          <>
            <ChatHeader
              activeBot={activeBot}
              bots={bots}
              showDropdown={showDropdown}
              onSelectBot={selectBot}
              onToggleDropdown={() => setShowDropdown(!showDropdown)}
              onClose={() => closeChat()}
            />
            <MessageList messages={messages} />
            <ChatInput
              value={customerMessage}
              onChange={setCustomerMessage}
              onSend={sendMessageHandler}
            />
          </>
        )}
      </div>

      {/* Floating toggle button */}
      {!isChatOpen && <ChatToggleButton onClick={startChat} />}
    </div>
  );
}