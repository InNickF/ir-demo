import { Chat } from "@/modules/insight/typings";
import { useEffect, useRef } from "react";

interface UseInitializeChatOnMountArgs {
  chat: Chat;
  onInitialize: () => void;
}
export const useInitializeChatOnMount = ({
  chat,
  onInitialize,
}: UseInitializeChatOnMountArgs) => {
  const firstRender = useRef(true);
  useEffect(() => {
    if (!chat) return;
    if (chat.initialized) return;
    if (firstRender.current) {
      firstRender.current = false;
      onInitialize?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
