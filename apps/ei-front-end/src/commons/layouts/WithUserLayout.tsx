import { FullscreenLoader } from "@/commons/components/feedback/FullscreenLoader";
import { useMe } from "@/commons/services/managers/react-query/queries/user";
import { FC, PropsWithChildren } from "react";

export const WithAuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useMe();

  return <>{isLoading || !data ? <FullscreenLoader /> : children}</>;
};
