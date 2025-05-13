import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InsightPermissionsLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_SIGHT"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
