import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getInvestmentsByInvestors } from "../api/investor";
import { GenericLabelValueObject } from "@/commons/typings";

export const investorQueries = createQueryKeys("investor", {
  investors: null,
  investmentsByInvestors: (investors: GenericLabelValueObject[]) => ({
    queryKey: [{ investors }],
    queryFn: () => getInvestmentsByInvestors(investors),
  }),
});
