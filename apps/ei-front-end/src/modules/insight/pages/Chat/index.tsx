import { NextPageWithLayout } from "@/commons/typings";
import { ChatForm } from "@/insight/components/data-entry/ChatForm";
import { InsightHead } from "@/insight/components/general/InsightHead";
import { useMessagesByChatId } from "@/insight/hooks/useMessagesByChatId";
import { GeneralLayout } from "@/insight/layouts/General";
import { useAddNewUserMessageMutation } from "@/insight/services/mutations/chats";
import { addMessageAtom, updateChatAtom } from "@/insight/store";
import {
  createUserMessageFromContent,
  systemMessagesToConversationPayload,
} from "@/insight/utils";
import { InsightPermissionsLayout } from "@/modules/insight/layouts/InsightPermissionsLayout";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { ReactElement, useEffect, useRef } from "react";
import { Messages } from "./components/Messages";
import { MessagesSkeleton } from "./components/MessagesSkeleton";
import { useChat } from "./hooks/useChat";
import { useInitializeChatOnMount } from "./hooks/useInitializeChatOnMount";
import "./styles.css";

const ChatPage: NextPageWithLayout = () => {
  const chat = useChat();
  const messages = useMessagesByChatId(chat?.id);
  const [, addNewMessage] = useAtom(addMessageAtom);
  const [, updateChat] = useAtom(updateChatAtom);
  const addMessageMutation = useAddNewUserMessageMutation({ chatId: chat?.id });
  const initializeChatMutation = useAddNewUserMessageMutation({
    chatId: chat?.id,
    onSuccess() {
      updateChat({
        ...chat,
        initialized: true,
      });
    },
  });
  const messagesEndRef = useRef<HTMLSpanElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(
    function scrollToBottomOnNewMessage() {
      scrollToBottom();
    },
    [messages]
  );

  useInitializeChatOnMount({
    chat,
    onInitialize() {
      const conversation = systemMessagesToConversationPayload(messages);
      initializeChatMutation.mutate(conversation);
      scrollToBottom();
    },
  });

  const onCreateMessage = (content: string) => {
    const message = createUserMessageFromContent({
      content,
      chatId: chat?.id,
    });
    const conversation = systemMessagesToConversationPayload([
      ...messages,
      message,
    ]);
    addMessageMutation.mutate(conversation);
    addNewMessage(message);
    scrollToBottom();
  };

  const hasAssistantMessage = messages.some(
    (message) => message.role === "assistant"
  );

  const lastMessage = messages[messages.length - 1];
  const canResendLastMessage =
    (lastMessage &&
      lastMessage?.role === "user" &&
      !addMessageMutation.isLoading &&
      messages.length > 1) ||
    addMessageMutation.isError;

  const onResendMessage = () => {
    const conversation = systemMessagesToConversationPayload(messages);
    addMessageMutation.mutate(conversation);
    scrollToBottom();
  };

  return (
    <>
      <div className="insight-chat-messages-container">
        {chat ? <Messages messages={messages} /> : <MessagesSkeleton />}
        <Button
          kind="outline"
          className={!canResendLastMessage ? "hidden" : undefined}
          disabled={addMessageMutation.isLoading || !canResendLastMessage}
          onClick={onResendMessage}
        >
          Resend message
        </Button>
        <span ref={messagesEndRef}></span>
      </div>
      <ChatForm
        onMessage={(formData) => onCreateMessage(formData.content)}
        disabled={!chat}
        isLoading={addMessageMutation.isLoading || !hasAssistantMessage}
      />
    </>
  );
};

ChatPage.getLayout = (page: ReactElement) => {
  return (
    <InsightPermissionsLayout>
      <InsightHead title="Chat" />
      <GeneralLayout>{page}</GeneralLayout>
    </InsightPermissionsLayout>
  );
};

export default ChatPage;
