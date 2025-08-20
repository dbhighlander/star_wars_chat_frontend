import { ChatData } from '../types/types';
import { storeChatDataToCookie } from '../utils/cookies';

export async function createChat(botSlug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAR_WARS_PUBLIC_API_URL}/chats/create/${botSlug}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      // Check for non-200 status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chat Created:', data.result);

    if (data.result == 'success') {
      storeChatData(data.details);
      return data.details;
    } else {
      console.error("Can't load bots");
    }
  } catch (error) {
    console.error('Failed to fetch bots:', error);
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
