import { chatsAtom } from "@/modules/insight/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useRedirectOnNotFound } from "./useRedirectOnNotFound";

export const useChat = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [chats] = useAtom(chatsAtom);
  const chat = chats.find((chat) => chat.id === id);

  useRedirectOnNotFound({ id, chat });
  return chat;
};
