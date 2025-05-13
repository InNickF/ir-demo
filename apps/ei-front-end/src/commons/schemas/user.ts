import { z } from "zod";
import { userPermissions } from "../utils/user";

export const UserPermissionsSchema = z.enum(userPermissions);

export const UserSchema = z.object({
  username: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  privilege: z.string().nullable(),
  id: z.number(),
  is_active: z.boolean().nullable(),
  last_name: z.string().nullable(),
  last_login: z.string().nullable(),
  modules: z.array(UserPermissionsSchema),
});
