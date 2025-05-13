import { z } from "zod";
import {
  AssistantMessagePayloadSchema,
  AssistantMessageSchema,
  BaseMessageSchema,
  ChatSchema,
  ConversationPayloadSchema,
  MessageRolesSchema,
  MessageSchema,
  PromptSchema,
  UserMessagePayloadSchema,
  UserMessageSchema,
} from "../schemas";

export type Chat = z.infer<typeof ChatSchema>;
export type MessageRole = z.infer<typeof MessageRolesSchema>;
export type UserMessagePayload = z.infer<typeof UserMessagePayloadSchema>;
export type AssistantMessagePayload = z.infer<
  typeof AssistantMessagePayloadSchema
>;
export type BaseMessage = z.infer<typeof BaseMessageSchema>;
export type UserMessage = z.infer<typeof UserMessageSchema>;
export type AssistantMessage = z.infer<typeof AssistantMessageSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Prompt = z.infer<typeof PromptSchema>;

export type ChatFormAction = (content: string) => void;

export type ConversationPayload = z.infer<typeof ConversationPayloadSchema>;
