import Cookies from 'js-cookie';

export async function assignBotToChat(botSlug: string) {
  const chatCookieData = getChatDataFromCookie();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STAR_WARS_PUBLIC_API_URL}/chats/switch_bot/${botSlug}/${chatCookieData.c}`,
      {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY!, // your API key from env
        },
      }
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
