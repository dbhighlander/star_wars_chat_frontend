export interface Bot {
  slug: string;
  name: string;
  avatar?: string;
}

export interface Message {
  type: "system" | "user" | "bot";
  message: string;
}
