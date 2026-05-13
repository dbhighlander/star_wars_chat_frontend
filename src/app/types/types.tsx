export interface Bot {
  slug: string;
  name: string;
  avatar?: string;
}

export interface Message {
  type: 'system' | 'user' | 'bot';
  message: string;
}

export interface ChatData {
  user_ref: string,
  chat_ref: string
}

export interface ChatDataCookie {
  u: string,
  c: string
}

export type Star = {
  layer: number,
  x: number,
  y: number,
  size: number,
  opacity: number,
  duration: number,
  delay: number
}