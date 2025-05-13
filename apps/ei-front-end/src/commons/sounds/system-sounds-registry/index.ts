import { modulesSoundsRegistry } from "./modules";
import { notificationSoundsRegistry } from "./notifications";

export const systemSoundsRegistry = {
  notifications: notificationSoundsRegistry,
  modules: modulesSoundsRegistry,
} as const;
