import { IsLoadingProp } from "@/commons/typings";
import { Message } from "@/modules/insight/components/data-display/Message";
import { Message as TMessage } from "@/modules/insight/typings";
import { Loader } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface MessagesProps extends IsLoadingProp {
  messages: TMessage[];
}
export const Messages: FC<MessagesProps> = ({ messages, isLoading }) => {
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <Loader className={isLoading ? undefined : "hidden"} />
    </>
  );
};
