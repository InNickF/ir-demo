import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InDispositionsPermissionsLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_DISPOSITIONS"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
