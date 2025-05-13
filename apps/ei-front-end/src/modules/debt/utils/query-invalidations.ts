import { QueryClient } from "@tanstack/react-query";
import { queries } from "../services/keys";

interface InvalidateLoansQueriesOptions {
  queryClient: QueryClient;
  id?: string;
}
export const invalidateLoansQueries = ({
  queryClient,
  id,
}: InvalidateLoansQueriesOptions) => {
  if (id) {
    queryClient.invalidateQueries({
      queryKey: queries.loans.debtLoanSummary({ id: id }).queryKey,
    });
  }
  queryClient.invalidateQueries({
    queryKey: queries.loans.debtLoans._def,
  });
};
