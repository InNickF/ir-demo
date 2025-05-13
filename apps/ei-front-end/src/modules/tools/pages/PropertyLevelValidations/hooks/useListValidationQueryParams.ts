import { useRouter } from "next/router";

export const useListValidationQueryParams = () => {
  const router = useRouter();
  return {
    list_code: router?.query?.list_code as string,
    month: "3",
    year: "2024",
  };
};
