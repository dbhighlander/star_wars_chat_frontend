import Cookies from 'js-cookie';

export async function createChat(botSlug) {
    try {
      const response = await fetch(`http://localhost:8081/chats/create/${botSlug}`, {
        method: 'GET',
      });

      if (!response.ok) {
        // Check for non-200 status
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Chat Create:', data.result);

      if(data.result == "success"){
        storeChatDataToCookie(data.details)
        return data.details
      } else {
        console.error("Can't load bots");
      }
      

    } catch (error) {
      console.error('Failed to fetch bots:', error);
      return null;
    }
  }

  function storeChatDataToCookie(chatData){
    const chatDataCookie = {
        c: chatData.chat_ref,
        u: chatData.user_ref
    }
    Cookies.set('cd', JSON.stringify(chatDataCookie), { expires: 1, path: '/' }); // expires in 1 day
  }