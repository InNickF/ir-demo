import { userQueries } from "@/commons/services/managers/react-query/queries/user";
import { User } from "@/commons/typings/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useLayoutEffect } from "react";
import { AuthHead } from "../components/general/AuthHead";

export const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData([
    ...userQueries.user.me.queryKey,
  ]);

  useLayoutEffect(() => {
    if (data?.username) {
      push("/");
    }
  }, [push, data]);

  return (
    <>
      <AuthHead title="Auth" />
      {children}
    </>
  );
};
