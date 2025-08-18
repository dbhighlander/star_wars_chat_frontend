import Cookies from 'js-cookie';

export async function assignBotToChat(botSlug: string) {

  const chatCookieData = getChatDataFromCookie()
    try {
      const response = await fetch(`http://localhost:8081/chats/switch_bot/${botSlug}/${chatCookieData.c}`, {
        method: 'GET',
      });

      if (!response.ok) {
        // Check for non-200 status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Message sent:', data.result);

      if(data.result == "success"){
        return data.details
      } else {
        console.error("Error failing bot switch");
      }
      

    } catch (error) {
      console.error('Failed to fetch bots:', error);
      return null;
    }
  }

  function getChatDataFromCookie(){
      const cookieData = Cookies.get('cd'); // expires in 1 day
      let chatData;
      try {
        chatData = JSON.parse(cookieData)
      } catch (err){
        console.log(err)
      }
      return chatData
    }