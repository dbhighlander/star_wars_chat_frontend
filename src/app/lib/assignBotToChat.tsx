'use client'
import Cookies from 'js-cookie';

export async function assignBotToChat(botSlug: string) {
  const chatCookieData = getChatDataFromCookie();
  try {
    const response = await fetch(
    `/api/chat/switch_bot?botSlug=${botSlug}&chatRef=${chatCookieData.c}`,
    { method: 'GET' }
    );

    if (!response.ok) {
      // Check for non-200 status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Message sent:', data.result);

    if (data.result == 'success') {
      return data.details;
    } else {
      console.error('Error failing bot switch');
    }
  } catch (error) {
    console.error('Failed to fetch bots:', error);
    return null;
  }
}

function getChatDataFromCookie() {
  const cookieData = Cookies.get('cd'); // expires in 1 day
  let chatData;

  try {
    if(typeof cookieData !== "undefined"){
      chatData = JSON.parse(cookieData);
    }    
  } catch (err) {
    console.log(err);
  }
  return chatData;
}
