import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { postChatCompletion } from "@/insight/services/api/chats";
import { addMessageAtom } from "@/insight/store";
import { Chat } from "@/insight/typings";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

interface UseAddNewUserMessageMutationArgs {
  chatId: Chat["id"];
  onSuccess?: () => void;
}
export const useAddNewUserMessageMutation = ({
  chatId,
  onSuccess,
}: UseAddNewUserMessageMutationArgs) => {
  const [, addNewMessage] = useAtom(addMessageAtom);
  const [, createNotification] = useAtom(addNotificationAtom);

  return useMutation({
    mutationFn: postChatCompletion,
    onSuccess(data) {
      if (chatId) {
        addNewMessage({
          id: crypto.randomUUID(),
          chatId,
          content: data.content,
          role: "assistant",
          data: data.data,
          query: data.query,
          columns: data.columns,
          createdAt: new Date().toString(),
        });
        onSuccess?.();
      }
    },
    onError(error) {
      createNotification({
        subject: `Error on getting chat completion.`,
        message: parseError(
          error,
          `Unable to get chat completion for chat "${chatId}"`
        ),
        kind: "error",
      });
    },
  });
};
