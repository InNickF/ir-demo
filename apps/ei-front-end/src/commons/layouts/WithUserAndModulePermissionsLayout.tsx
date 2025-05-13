import { FullscreenLoader } from "@/commons/components/feedback/FullscreenLoader";
import { useMe } from "@/commons/services/managers/react-query/queries/user";
import {
  addNotificationAtom,
  uniqueSubjectNotification,
} from "@/commons/store/jotai/notifications";
import { UserPermissions } from "@/commons/typings/user";
import { unauthorizedModuleMessage } from "@/commons/utils/notification-messages";
import { hasUserModulesPermission } from "@/commons/utils/user";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export interface WithUserAndModulePermissionsLayoutProps
  extends PropsWithChildren {
  permissions?: UserPermissions[];
}

export const WithUserAndModulePermissionsLayout: FC<
  WithUserAndModulePermissionsLayoutProps
> = ({ children, permissions = [] }) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const router = useRouter();
  const { data: user } = useMe();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (permissions.length && user) {
      const hasPermission = hasUserModulesPermission({
        user,
        targetModules: permissions,
      });

      if (!hasPermission) {
        router.push("/");
        createNotification({
          subject: uniqueSubjectNotification[0],
          message: unauthorizedModuleMessage,
          kind: "warning",
        });
      } else {
        if (authorized) return;
        setAuthorized(true);
      }
    }

    if (!permissions.length && user) {
      // If there are no permissions needed, it means that the user is authorized
      if (authorized) return;
      setAuthorized(true);
    }
  }, [permissions, user, router, authorized, createNotification]);

  return authorized ? <>{children}</> : <FullscreenLoader />;
};
