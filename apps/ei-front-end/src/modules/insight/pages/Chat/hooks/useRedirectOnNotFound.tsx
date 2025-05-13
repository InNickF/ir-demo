import { Chat } from "@/insight/typings";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface UseRedirectOnNotFoundArgs {
  id: string;
  chat: Chat;
}

type UseRedirectOnNotFound = (args: UseRedirectOnNotFoundArgs) => void;

export const useRedirectOnNotFound: UseRedirectOnNotFound = ({ id, chat }) => {
  const router = useRouter();
  useEffect(() => {
    if (id && !chat) {
      router.push("/insight");
    }
    if (!id) {
      router.push("/insight");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, router]);
};
