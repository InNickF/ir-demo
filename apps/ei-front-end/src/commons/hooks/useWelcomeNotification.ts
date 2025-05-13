import { useEffect } from "react";
import { SoundPlayer } from "../sounds";

const hasToPlayWelcomeSound = () => {
  const localStorageKey = "ei-last-welcome-sound-date";
  const lastDate = localStorage.getItem(localStorageKey);
  const currentDate = new Date().toLocaleDateString();
  const isDifferentDay = lastDate !== currentDate;

  if (isDifferentDay) {
    localStorage.setItem(localStorageKey, currentDate);
  }
  return isDifferentDay;
};

export const useWelcomeNotification = () => {
  useEffect(() => {
    if (hasToPlayWelcomeSound()) {
      const soundPlayer = SoundPlayer.getInstance();
      soundPlayer.playSound("modules.global");
    }
  }, []);
};
