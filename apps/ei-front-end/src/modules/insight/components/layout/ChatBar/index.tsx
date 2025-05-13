import { deprecated_ellipseLongText } from "@/commons/model-in/formatters/utils";
import { chatsAtom, deleteChatAtom } from "@/insight/store";
import { getChatURL } from "@/modules/insight/utils";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { ChatBarItem } from "./components/ChatBarItem";
import "./styles.css";

export const ChatBar = () => {
  const router = useRouter();
  const [chats] = useAtom(chatsAtom);
  const [, deleteChat] = useAtom(deleteChatAtom);
  const { id: chatId } = router.query as { id: string };
  const getIsActive = (id: string) => chatId && id === chatId;

  return (
    <div className="insight-chat-bar">
      {chats.map((chat) => (
        <ChatBarItem
          key={chat.id}
          href={getChatURL(chat.id)}
          onDelete={() => {
            deleteChat(chat.id);
          }}
          tooltip={chat.name}
          isActive={getIsActive(chat.id)}
        >
          {deprecated_ellipseLongText({
            text: chat.name,
          })}
        </ChatBarItem>
      ))}
      <ChatBarItem href="/insight">
        New Conversation
        <ArrowRightCircleIcon className="relative top-0.5 h-4 w-4" />
      </ChatBarItem>
    </div>
  );
};
