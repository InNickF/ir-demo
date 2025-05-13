import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { QueryClient, useQuery } from "@tanstack/react-query";
import * as api from "@/commons/services/api";

export const userQueries = createQueryKeyStore({
  user: {
    me: {
      queryKey: null,
    },
  },
});

export const useMe = (queryClient?: QueryClient) => {
  return useQuery({
    ...userQueries.user.me,
    queryFn: () => api.user.me(queryClient),
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
