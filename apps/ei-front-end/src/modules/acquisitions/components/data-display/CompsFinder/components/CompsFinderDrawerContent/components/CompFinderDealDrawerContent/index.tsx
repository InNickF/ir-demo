import { Deal } from "@/acquisitions/typings/deals";
import { FC } from "react";

interface CompFinderCompDrawerContentProps {
  deal: Deal;
  multipleDeals?: boolean;
}

export const CompFinderDealDrawerContent: FC<
  CompFinderCompDrawerContentProps
> = () => {
  return <div>CompFinderDealDrawerContent</div>;
};
