import { messagesByChatAtom } from "@/insight/store";
import { useAtom } from "jotai";
import { useMemo } from "react";

export const useMessagesByChatId = (chatId: string) => {
  const memoMessagesByChatAtom = useMemo(
    () => messagesByChatAtom(chatId),
    [chatId]
  );
  const [messages] = useAtom(memoMessagesByChatAtom);

  return messages;
};
