import { deprecated_ellipseLongText } from "@/commons/model-in/formatters/utils";
import { createUUID } from "@/commons/utils/uuid";
import { NotificationItemProps } from "in-ui-react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface INotification extends Omit<NotificationItemProps, "onClose"> {
  key: string;
  onClose?: () => void;
}
/* notifications to omit if subject exist */
export const uniqueSubjectNotification = [
  "Unauthorized.",
  "Forbidden.",
  "Unauthenticated.",
] as const;

export const notificationsAtom = atom<INotification[]>([]);
export const addNotificationAtom = atom(
  null,
  (get, set, update: Omit<INotification, "key">) => {
    if (update.kind === "error") return;
    const duration = update.timeout || 6000;
    const defaultSubjects: Record<NotificationItemProps["kind"], string> = {
      error: "Error",
      info: "Info",
      success: "Success",
      warning: "Warning",
    };
    const subject = update.subject || defaultSubjects[update.kind || "info"];
    const uuid = createUUID();
    const maxMessageLength = 500;
    const notification: INotification = {
      ...update,
      message: deprecated_ellipseLongText({
        text: update.message,
        maxLength: maxMessageLength,
      }),
      subject,
      key: uuid,
      timeout: duration,
      kind: update.kind || "info",
    };

    // Allowing to see the message in the console if it's too long.
    update.message.length > maxMessageLength && console.error(update.message);

    const notifications = get(notificationsAtom);

    const hasToOmitNotification = notifications.find((notification) =>
      uniqueSubjectNotification.includes(
        notification.subject as typeof uniqueSubjectNotification[number]
      )
    );

    if (hasToOmitNotification && hasToOmitNotification.subject === subject)
      return;

    set(notificationsAtom, [...notifications, notification]);

    setTimeout(() => {
      const notifications = get(notificationsAtom);
      set(
        notificationsAtom,
        notifications.filter((notification) => notification.key !== uuid)
      );
    }, duration);
  }
);

export const removeNotificationAtom = atom(
  null,
  (get, set, update: INotification["key"]) => {
    const notifications = get(notificationsAtom);
    set(
      notificationsAtom,
      notifications.filter((notification) => notification.key !== update)
    );
  }
);

export const localStorageSoundConfigKey = "ei-is-sound-active";
export const soundConfigAtom = atomWithStorage<boolean>(
  localStorageSoundConfigKey,
  true
);
