import { SoundPlayer } from "@/commons/sounds";
import { useEffect, useRef } from "react";

export const useInitSoundSystem = () => {
  const wasMounted = useRef(false);
  useEffect(function initSoundSystem() {
    if (!wasMounted.current) {
      wasMounted.current = true;
      SoundPlayer.getInstance();
    }
  }, []);
};
