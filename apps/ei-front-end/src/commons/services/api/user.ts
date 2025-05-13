import { UserSchema } from "@/commons/schemas/user";
import { importQueries } from "@/pages/_app";
import { QueryClient } from "@tanstack/react-query";

export const me = async (queryClient?: QueryClient) => {
  if (queryClient) {
    await importQueries(queryClient);
  }

  const response = await fetch("/cache/plv-list.json");
  const data = await response.json();
  return UserSchema.parse(data[0].state.data);
};
