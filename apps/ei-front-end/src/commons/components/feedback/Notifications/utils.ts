import { SoundPlayer } from "@/commons/sounds";
import { SoundKeys } from "@/commons/sounds/types";
import { NotificationItemProps } from "in-ui-react";
import { FC } from "react";

interface PlayNotificationSoundParams {
  kind: NotificationItemProps["kind"];
}

const soundsByKind: Record<NotificationItemProps["kind"], SoundKeys> = {
  error: "notifications.error",
  success: "notifications.success",
  warning: null,
  info: null,
};

export const playNotificationKindSounds: FC<PlayNotificationSoundParams> = ({
  kind,
}) => {
  const soundPlayer = SoundPlayer.getInstance();

  const soundKey = soundsByKind[kind];
  if (soundKey) {
    soundPlayer.playSound(soundKey);
  }
  return null;
};
