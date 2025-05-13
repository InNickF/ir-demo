import { addChatAtom, addMessageAtom } from "@/insight/store";
import { Chat } from "@/insight/typings";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  createUserMessageFromContent,
  creteNewChatFromName,
  getChatURL,
} from "../utils";

export const useAddNewChatAndRedirect = () => {
  const router = useRouter();
  const [, addNewChat] = useAtom(addChatAtom);
  const [, addNewMessage] = useAtom(addMessageAtom);

  const addNewChatAndRedirect = useCallback(
    (chatName: Chat["name"]) => {
      const chat = creteNewChatFromName(chatName);
      const firstMessage = createUserMessageFromContent({
        chatId: chat.id,
        content: chatName,
      });
      addNewChat(chat);
      addNewMessage(firstMessage);
      router.push(getChatURL(chat.id));
    },
    [router, addNewChat, addNewMessage]
  );

  return addNewChatAndRedirect;
};
