import { systemSoundsRegistry } from "./system-sounds-registry";

export type SystemSoundRegistryItem = {
  source: string;
  /**
   * The source of the sound.
   */
  preload: boolean;
  /**
   * Whether the sound should be preloaded.
   */
  stackable: boolean;
  /**
   * Whether the sound can be played multiple times simultaneously.
   */
};

export type SystemSoundRegistryCategories = keyof typeof systemSoundsRegistry;

export type SoundKeys = {
  [Category in SystemSoundRegistryCategories]: {
    [Key in keyof typeof systemSoundsRegistry[Category]]: `${Category}.${Key extends string
      ? Key
      : string}`;
  }[keyof typeof systemSoundsRegistry[Category]];
}[SystemSoundRegistryCategories];
