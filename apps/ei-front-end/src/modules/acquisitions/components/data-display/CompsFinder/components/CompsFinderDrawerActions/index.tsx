import { Deal } from "@/acquisitions/typings/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { FC } from "react";
import { CompFinderCompDrawerAction } from "./components/CompFinderCompDrawerAction";
import { CompFinderDealDrawerAction } from "./components/CompFinderDealDrawerAction";
import { IsLoadingProp } from "@/commons/typings";

interface CompsFinderDrawerActionsProps extends IsLoadingProp {
  /* TODO: See how we can deal with the key type on this Omit */
  element: CompstackComp | Deal | null;
  dealContext?: Deal;
  dealComps?: CompstackComp[];
}
export const CompsFinderDrawerActions: FC<CompsFinderDrawerActionsProps> = ({
  element,
  dealContext,
  dealComps,
  isLoading,
}) => {
  return (element as CompstackComp) && "type" in element ? (
    <CompFinderCompDrawerAction
      comp={element as CompstackComp}
      deal={dealContext}
      isLoading={isLoading}
      dealComps={dealComps}
    />
  ) : (element as Deal) && "fund" in element ? (
    <CompFinderDealDrawerAction deal={element as Deal} isLoading={isLoading} />
  ) : null;
};
