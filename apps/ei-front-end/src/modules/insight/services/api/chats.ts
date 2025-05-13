import { privateAxios } from "@/commons/services/clients";
import { AssistantMessagePayloadSchema } from "@/insight/schemas";
import {
  AssistantMessagePayload,
  ConversationPayload,
} from "@/insight/typings";

export const postChatCompletion = async (
  conversation: ConversationPayload
): Promise<AssistantMessagePayload> => {
  const response = await privateAxios.post("/ai/chat/", conversation);
  return AssistantMessagePayloadSchema.parse(response.data);
};
