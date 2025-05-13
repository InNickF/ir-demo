import { Deal } from "@/acquisitions/typings/deals";
import { IsLoadingProp } from "@/commons/typings";
import { FC } from "react";

interface CompFinderCompDrawerActionProps extends IsLoadingProp {
  deal: Deal;
}

export const CompFinderDealDrawerAction: FC<
  CompFinderCompDrawerActionProps
> = () => {
  return <div>CompFinderDealDrawerAction</div>;
};
