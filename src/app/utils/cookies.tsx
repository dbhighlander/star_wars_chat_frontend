import Cookies from 'js-cookie';
import {ChatDataCookie } from '../types/types';

export const deleteChatDataFromCookie = () => {
  Cookies.remove('cd', { path: '/' }); // expires in 1 day
};

export const storeChatDataToCookie = (chatData: ChatDataCookie) => {
  Cookies.set('cd', JSON.stringify(chatData), { expires: 1, path: '/' }); // expires in 1 day
};
