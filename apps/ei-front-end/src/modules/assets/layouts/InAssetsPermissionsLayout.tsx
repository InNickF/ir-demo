import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InAssetsPermissionsLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_ASSETS"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
