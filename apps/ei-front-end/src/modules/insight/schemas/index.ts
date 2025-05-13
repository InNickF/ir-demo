import { z } from "zod";
import { MESSAGE_ROLES } from "../utils";

export const MessageRolesSchema = z.enum(MESSAGE_ROLES);

export const ChatSchema = z.object({
  id: z.string(),
  name: z.string(),
  initialized: z.boolean(),
  createdAt: z.string(),
});

export const UserMessagePayloadSchema = z.object({
  content: z.string(),
  role: z.literal(MessageRolesSchema.Values.user),
});

export const AssistantMessagePayloadSchema = z.object({
  content: z.string().nullish(),
  role: z.literal(MessageRolesSchema.Values.assistant),
  query: z.string().nullable(),
  columns: z.array(z.string()).nullable(),
  data: z
    .array(z.record(z.union([z.string(), z.number(), z.boolean(), z.any()])))
    .nullable(),
});

export const BaseMessageSchema = z.object({
  id: z.string(),
  chatId: ChatSchema.shape.id,
  createdAt: z.string(),
});

export const UserMessageSchema = BaseMessageSchema.merge(
  UserMessagePayloadSchema
);

export const AssistantMessageSchema = BaseMessageSchema.merge(
  AssistantMessagePayloadSchema
);

export const MessageSchema = z.union([
  UserMessageSchema,
  AssistantMessageSchema,
]);

export const PromptSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export const ConversationPayloadSchema = z.array(
  z.object({
    content: z.string(),
    role: MessageRolesSchema,
    query: z.string().nullish(),
  })
);
