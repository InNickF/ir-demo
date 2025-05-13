import { UserMessage as TUserMessage } from "@/modules/insight/typings";
import { FC } from "react";
import { MessageAvatar } from "../MessageAvatar";
import "./styles.css";

interface UserMessageProps {
  message: TUserMessage;
}

const prefix = "insight-user-message";
export const UserMessage: FC<UserMessageProps> = ({ message }) => {
  return (
    <div className={`${prefix} generic-entrance-animation`}>
      <MessageAvatar role={message.role} />
      <p className={`${prefix}__content`}>{message.content}</p>
    </div>
  );
};
