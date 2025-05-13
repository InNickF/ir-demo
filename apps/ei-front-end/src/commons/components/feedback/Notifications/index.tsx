import {
  notificationsAtom,
  removeNotificationAtom,
} from "@/commons/store/jotai/notifications";
import { Notification } from "in-ui-react";
import { useAtom } from "jotai";
import { playNotificationKindSounds } from "./utils";

export const Notifications = () => {
  const [notifications] = useAtom(notificationsAtom);
  const [, setNotifications] = useAtom(removeNotificationAtom);

  return (
    <Notification.Container position="top-right">
      {notifications.map((notification) => (
        <Notification.Item
          className="generic-entrance-animation"
          key={notification.key}
          kind={notification.kind}
          subject={notification.subject}
          message={notification.message}
          timeout={notification.timeout}
          onClose={() => {
            notification.onClose?.();
            setNotifications(notification.key);
          }}
          onMount={() => {
            notification?.onMount?.();
            playNotificationKindSounds({
              kind: notification.kind,
            });
          }}
        />
      ))}
    </Notification.Container>
  );
};
