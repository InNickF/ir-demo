import { SystemSoundRegistryItem } from "../types";

export const notificationSoundsRegistry = {
  success: {
    source: "notification-success.mp3",
    preload: true,
    stackable: false,
  } as SystemSoundRegistryItem,
  error: {
    source: "notification-error.mp3",
    preload: true,
    stackable: false,
  } as SystemSoundRegistryItem,
} as const;
