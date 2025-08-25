'use client'
import { ChatData } from '../types/types';
import { storeChatDataToCookie } from '../utils/cookies';

export async function createChat(botSlug: string) {
  try {
    const response = await fetch(`/api/chat/create?botSlug=${botSlug}`, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chat Created:', data.result);

    if (data.result === 'success') {
      storeChatData(data.details);
      return data.details;
    } else {
      console.error("Can't create chat");
    }
  } catch (error) {
    console.error('Failed to create chat:', error);
    return null;
  }
}

function storeChatData(chatData: ChatData) {
  const chatDataCookie = {
    c: chatData.chat_ref,
    u: chatData.user_ref,
  };
  storeChatDataToCookie(chatDataCookie);
}