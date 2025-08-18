
import ChatClient from "./chat-client";
import { cookies } from 'next/headers'
import { fetchBots } from "../lib/fetchBots";
import { fetchChat } from "../lib/fetchChat";

export default async function Chat() {
    
    const bots = await fetchBots();
    const [isChatDataFound, chatData] = await getExistingChatData()

    let messages = [];
    let activeBotSlug = "";
    if(isChatDataFound){
        messages = chatData.messages
        activeBotSlug = chatData.bot_slug
    }

    return <ChatClient bots={bots} messages={messages} activeBotSlug={activeBotSlug} />
}

const getExistingChatData = async() => {

    let existingChatData = [false, {}]
    const cookieStore = await cookies()
    const existingChatReferences = cookieStore.get('cd')

    if(typeof existingChatReferences === "undefined" || typeof existingChatReferences.value === "undefined"){
        existingChatData = [false, {} ]
        return existingChatData
    }

    let chatCookieData

    try {
        chatCookieData = JSON.parse(existingChatReferences.value)
    } catch (err) {
        existingChatData = [false, {}]
        return existingChatData
    }

    const chatData = await fetchChat(chatCookieData.u, chatCookieData.c)
    
    return [true, chatData]
}