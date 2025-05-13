import { z } from "zod";
import { UserPermissionsSchema, UserSchema } from "../schemas/user";

export type User = z.infer<typeof UserSchema>;
export type UserPermissions = z.infer<typeof UserPermissionsSchema>;
