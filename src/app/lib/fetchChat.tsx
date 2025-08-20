import Cookies from 'js-cookie';
import { ChatData } from '../types/types';

export async function fetchChat(userRef: string, chatRef: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAR_WARS_PUBLIC_API_URL}/${userRef}/${chatRef}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      // Check for non-200 status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chat Loaded:', data.result);

    if (data.result == 'success') {
      storeChatDataToCookie(data.details);
      return data.details;
    } else {
      console.error("Can't load bots");
    }
  } catch (error) {
    console.error('Failed to fetch bots:', error);
    return null;
  }
}



function storeChatDataToCookie(chatData: ChatData) {
  const chatDataCookie = {
    c: chatData.chat_ref,
    u: chatData.user_ref,
  };
  Cookies.set('cd', JSON.stringify(chatDataCookie), { expires: 1, path: '/' }); // expires in 1 day
}
