import {
  addNotificationAtom,
  uniqueSubjectNotification,
} from "@/commons/store/jotai/notifications";
import { redirectToLogin } from "@/commons/utils/auth";
import { unauthorizedMessage } from "@/commons/utils/notification-messages";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import Router from "next/router";
import { FC, PropsWithChildren, useMemo, useRef } from "react";

const STALE_TIME_MINUTES = 1440 * 7; // 7 days

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const isSecondRender = useRef(false);
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: AxiosError) => {
            if (error.response && error?.response.status === 401) {
              redirectToLogin({
                path: "/auth",
                pushWithPrevPath: true,
              });
              createNotification({
                subject: uniqueSubjectNotification[2],
                message: "Your session has expired. Please login again.",
                kind: "error",
                timeout: 3000,
              });
              queryClient.clear();
            }

            if (error.response && error?.response.status === 403) {
              Router.push("/");
              createNotification({
                subject: uniqueSubjectNotification[0],
                message: unauthorizedMessage,
                kind: "error",
                timeout: 4500,
              });
              queryClient.clear();
            }
          },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!isSecondRender.current) {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: STALE_TIME_MINUTES * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    });
    isSecondRender.current = true;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
