import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InDebtPermissionsLayout: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_DEBT"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
