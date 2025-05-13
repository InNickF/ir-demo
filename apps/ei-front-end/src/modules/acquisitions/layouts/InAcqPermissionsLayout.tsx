import { WithUserAndModulePermissionsLayout } from "@/commons/layouts/WithUserAndModulePermissionsLayout";
import { FC, PropsWithChildren } from "react";

export const InAcqPermissionsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WithUserAndModulePermissionsLayout permissions={["IN_ACQUISITIONS"]}>
      {children}
    </WithUserAndModulePermissionsLayout>
  );
};
