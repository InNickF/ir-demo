import { Message as MessageT } from "@/modules/insight/typings";
import { FC } from "react";
import { AssistantMessage } from "./components/AssistantMessage";
import { UserMessage } from "./components/UserMessage";

interface MessageProps {
  message: MessageT;
}
export const Message: FC<MessageProps> = ({ message }) => {
  return message.role === "user" ? (
    <UserMessage message={message} />
  ) : (
    <AssistantMessage message={message} />
  );
};
