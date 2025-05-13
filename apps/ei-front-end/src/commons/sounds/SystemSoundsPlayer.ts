import { localStorageSoundConfigKey } from "../store/jotai/notifications";
import { systemSoundsRegistry } from "./system-sounds-registry";
import { SoundKeys, SystemSoundRegistryItem } from "./types";

export class SoundPlayer {
  private static instance: SoundPlayer;
  private audioContext: AudioContext;
  private buffers: Map<SoundKeys, AudioBuffer> = new Map();
  private sources: Map<SoundKeys, AudioBufferSourceNode[]> = new Map();
  private loadingStates: Map<SoundKeys, Promise<void>> = new Map();
  private hasPreloadedSounds = false;

  private constructor() {
    this.audioContext = new AudioContext();
    this.preloadSounds();
  }

  static getInstance(): SoundPlayer {
    if (!SoundPlayer.instance) {
      if (!localStorage.getItem(localStorageSoundConfigKey)) {
        localStorage.setItem(localStorageSoundConfigKey, "true");
      }
      SoundPlayer.instance = new SoundPlayer();
    }
    return SoundPlayer.instance;
  }

  private priorityKeys: SoundKeys[] = ["modules.global"];

  private getCategoryAndSound(
    key: SoundKeys
  ): [keyof typeof systemSoundsRegistry, string] {
    return key.split(".") as [keyof typeof systemSoundsRegistry, string];
  }

  private getPreloadableSounds(): SoundKeys[] {
    const keys: SoundKeys[] = [];
    Object.entries(systemSoundsRegistry).forEach(([category, sounds]) => {
      Object.entries(sounds).forEach(([sound, { preload }]) => {
        if (preload) {
          keys.push(`${category}.${sound}` as SoundKeys);
        }
      });
    });
    return keys;
  }

  async preloadSounds(): Promise<void> {
    if (this.hasPreloadedSounds) {
      return;
    }

    const preloadableSounds: SoundKeys[] = this.getPreloadableSounds();

    await Promise.all(preloadableSounds.map((key) => this.loadSound(key))).then(
      () => {
        this.hasPreloadedSounds = true;
      }
    );
  }

  private async loadSound(key: SoundKeys): Promise<void> {
    if (!this.buffers.has(key)) {
      if (!this.loadingStates.has(key)) {
        const loadPromise = this.fetchAndDecodeSound(key);
        this.loadingStates.set(key, loadPromise);
        await loadPromise;
        this.loadingStates.delete(key);
      } else {
        await this.loadingStates.get(key);
      }
    }
  }

  private async fetchAndDecodeSound(key: SoundKeys): Promise<void> {
    const [category, sound] = this.getCategoryAndSound(key);
    const entry = systemSoundsRegistry[category][
      sound as keyof typeof systemSoundsRegistry[keyof typeof systemSoundsRegistry]
    ] as SystemSoundRegistryItem;

    const response = await fetch(`/${entry.source}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.buffers.set(key, audioBuffer);
  }

  private hasActiveSound(): boolean {
    const canPlaySound = localStorage.getItem(localStorageSoundConfigKey);
    return canPlaySound === "true";
  }

  async playSound(key: SoundKeys): Promise<void> {
    if (!this.hasActiveSound()) {
      return;
    }

    if (
      this.audioContext.state === "suspended" &&
      !this.priorityKeys.includes(key)
    ) {
      return;
    }

    if (!this.buffers.has(key)) {
      await this.loadSound(key);
    }

    const buffer = this.buffers.get(key);
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.onended = () => {
      const sources = this.sources.get(key);
      if (sources) {
        this.sources.set(
          key,
          sources.filter((s) => s !== source)
        );
      }
    };
    source.start();

    if (!this.sources.has(key)) {
      this.sources.set(key, []);
    }
    this.sources.get(key).push(source);
  }

  stopSound(key: SoundKeys): void {
    if (this.sources.has(key)) {
      const sources = this.sources.get(key);
      sources.forEach((source) => source.stop());
      this.sources.delete(key);
    }
  }
}
