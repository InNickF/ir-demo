import { MessageRole } from "@/modules/insight/typings";
import { FC } from "react";
import "./styles.css";

interface MessageAvatarProps {
  role: MessageRole;
}
export const MessageAvatar: FC<MessageAvatarProps> = ({ role }) => {
  const isUser = role === "user";
  const prefix = "insight-message-avatar";
  const getClasses = () => {
    const classes = [prefix];
    isUser
      ? classes.push(`${prefix}--user`)
      : classes.push(`${prefix}--assistant`);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()}>
      {isUser ? (
        <p>You</p>
      ) : (
        <div className="flex">
          <p className="insight-assistant-avatar-first-letter">i</p>
          <p className="insight-assistant-avatar-second-letter">S</p>
        </div>
      )}
    </div>
  );
};
