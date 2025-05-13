import { Deal } from "@/acquisitions/typings/deals";
import {
  CompstackComp,
  CompstackCompType,
} from "@/acquisitions/typings/market-analytics";
import { IsLoadingProp } from "@/commons/typings";
import { FC } from "react";
import { CompsFinderResults } from "../CompsFinderResults";

interface CompsFinderResultsWrapperProps extends IsLoadingProp {
  comps: CompstackComp[];
  deals: Deal[];
  className?: string;
}
export const CompsFinderResultsWrapper: FC<CompsFinderResultsWrapperProps> = ({
  comps,
  deals,
  isLoading,
  className,
}) => {
  const getLeaseCompsCount = (): number => {
    return comps.filter((comp: CompstackComp) => comp.type === "lease").length;
  };

  const getSaleCompsCount = (): number => {
    return comps.filter((comp: CompstackComp) => comp.type === "sale").length;
  };

  const getLandCompsCount = (): number => {
    return comps.filter(
      (comp: CompstackComp) => (comp.type as CompstackCompType) === "land"
    ).length;
  };

  const getDealsCount = (): number | null => {
    return deals?.length > 1 ? deals.length : null;
  };
  return (
    <CompsFinderResults
      className={className}
      isLoading={isLoading}
      leaseCount={getLeaseCompsCount()}
      saleCount={getSaleCompsCount()}
      landCount={getLandCompsCount()}
      dealsCount={getDealsCount()}
    />
  );
};
