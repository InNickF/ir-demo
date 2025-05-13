import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InToolsPermissionsLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_TOOLS"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
