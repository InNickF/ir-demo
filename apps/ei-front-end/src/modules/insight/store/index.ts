import { Chat, Message } from "@/insight/typings";
import { orderMessagesByCreatedAt } from "@/insight/utils";
import { atom } from "jotai";

import { atomWithStorage, createJSONStorage } from "jotai/utils";

const chatsStorage = createJSONStorage<Chat[]>(() =>
  typeof window !== "undefined" ? window?.sessionStorage : null
);
export const chatsAtom = atomWithStorage<Chat[]>(
  "insight-chats",
  [],
  chatsStorage
);

export const chatAtom = (id: Chat["id"]) =>
  atom((get) => {
    const chats = get(chatsAtom);
    return chats.find((chat) => chat.id === id);
  });

export const addChatAtom = atom(null, (get, set, chat: Chat) => {
  const chats = get(chatsAtom);
  set(chatsAtom, [...chats, chat]);
});

export const updateChatAtom = atom(null, (get, set, chat: Chat) => {
  const chats = get(chatsAtom);
  set(
    chatsAtom,
    chats.map((c) => {
      const newChat = chat;
      return c.id === chat.id ? newChat : c;
    })
  );
});

export const deleteChatAtom = atom(null, (get, set, id: Chat["id"]) => {
  const chats = get(chatsAtom);
  set(
    chatsAtom,
    chats.filter((chat) => chat.id !== id)
  );
});

const messagesStorage = createJSONStorage<Message[]>(() =>
  typeof window !== "undefined" ? window?.sessionStorage : null
);
export const messagesAtom = atomWithStorage<Message[]>(
  "insight-messages",
  [],
  messagesStorage
);

export const addMessageAtom = atom(null, (get, set, message: Message) => {
  const messages = get(messagesAtom);

  set(messagesAtom, [...messages, message]);
});

export const messagesByChatAtom = (chatId: Chat["id"]) =>
  atom((get) => {
    const messages = get(messagesAtom);

    return messages
      .filter((message) => message.chatId === chatId)
      .sort(orderMessagesByCreatedAt);
  });
