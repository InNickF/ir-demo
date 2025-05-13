import { SystemSoundRegistryItem } from "../types";

export const modulesSoundsRegistry = {
  global: {
    source: "notification-lobby.mp3",
    preload: true,
    stackable: false,
  } as SystemSoundRegistryItem,
} as const;
