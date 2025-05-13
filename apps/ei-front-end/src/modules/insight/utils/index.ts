import { Chat, ConversationPayload, Message, UserMessage } from "../typings";

export const MESSAGE_ROLES = ["user", "assistant"] as const;

export const orderMessagesByCreatedAt = (a: Message, b: Message) => {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
};

export const creteNewChatFromName = (chatName: Chat["name"]): Chat => {
  return {
    id: crypto.randomUUID(),
    name: chatName,
    initialized: false,
    createdAt: new Date().toString(),
  };
};

interface CreateUserMessageFromContentArgs {
  chatId: Chat["id"];
  content: UserMessage["content"];
}
export const createUserMessageFromContent = ({
  chatId,
  content,
}: CreateUserMessageFromContentArgs): UserMessage => {
  return {
    id: crypto.randomUUID(),
    chatId,
    content,
    role: "user",
    createdAt: new Date().toString(),
  };
};

export const getChatURL = (chatId: Chat["id"]) => `/insight/chat/?id=${chatId}`;

export const systemMessagesToConversationPayload = (
  messages: Message[]
): ConversationPayload => {
  return messages.map((message) => {
    if (message.role === "assistant" && "query" in message) {
      return {
        content: message?.content,
        role: message.role,
        query: message?.query || "",
      };
    }
    return {
      content: message.content,
      role: message.role,
    };
  });
};

export const pickRandomItemFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
