import { Deal } from "@/acquisitions/typings/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { FC } from "react";
import { CompFinderCompDrawerContent } from "./components/CompFinderCompDrawerContent";
import { CompFinderDealDrawerContent } from "./components/CompFinderDealDrawerContent";
import "./styles.css";

interface CompsFinderDrawerContentProps {
  element: CompstackComp | Deal | null;
}
export const CompsFinderDrawerContent: FC<CompsFinderDrawerContentProps> = ({
  element,
}) => {
  return (element as CompstackComp) && "type" in element ? (
    <CompFinderCompDrawerContent comp={element as CompstackComp} />
  ) : (element as Deal) && "fund" in element ? (
    <CompFinderDealDrawerContent deal={element as Deal} />
  ) : null;
};
