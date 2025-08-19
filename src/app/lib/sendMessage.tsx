import Cookies from 'js-cookie';

export async function sendMessage(message) {
  const chatCookieData = getChatDataFromCookie();
  try {
    const response = await fetch(
      `http://localhost:8081/message/${chatCookieData.c}`,
      {
        method: 'POST',
        body: JSON.stringify({ message }),
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
      console.error("Can't load bots");
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
    chatData = JSON.parse(cookieData);
  } catch (err) {
    console.log(err);
  }
  return chatData;
}
