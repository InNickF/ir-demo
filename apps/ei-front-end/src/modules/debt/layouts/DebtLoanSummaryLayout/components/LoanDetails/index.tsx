import { IsLoadingProp } from "@/commons/typings";
import { Skeleton } from "in-ui-react";
import { FC, PropsWithChildren } from "react";

export const LoanDetails: FC<PropsWithChildren & IsLoadingProp> = ({
  isLoading = false,
  children,
}) => {
  return <>{isLoading ? <Skeleton /> : children}</>;
};
