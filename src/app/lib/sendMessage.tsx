'use client'
import Cookies from 'js-cookie';

export async function sendMessage(message: string) {
  const chatCookieData = getChatDataFromCookie();
  if (!chatCookieData?.c) return null;

  try {
    const response = await fetch(`/api/chat/message/${chatCookieData.c}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Message sent:', data.result);

    if (data.result === 'success') {
      return data.details;
    } else {
      console.error("Can't send message");
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    return null;
  }
}

function getChatDataFromCookie() {
  const cookieData = Cookies.get('cd'); // expires in 1 day
  if (!cookieData) return null;

  try {
    return JSON.parse(cookieData);
  } catch (err) {
    console.error(err);
    return null;
  }
}
