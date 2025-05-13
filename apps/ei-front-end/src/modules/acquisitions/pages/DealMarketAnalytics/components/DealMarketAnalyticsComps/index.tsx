import { CompstackCompsTableCardPropsBase } from "@/acquisitions/components/data-display/compstack-comp-tables/types";
import { Deal } from "@/acquisitions/typings/deals";
import {
  CompstackCompTypeWithAllKeyLabelValue,
  compstackCompTypeLabelValue,
} from "@/acquisitions/utils";
import { IsRefetchingProp } from "@/commons/typings";
import { Select } from "in-ui-react";
import { FC, useState } from "react";
import { DealCompstackLandCompTable } from "./components/DealCompstackLandCompTable";
import { DealCompstackLeaseCompTable } from "./components/DealCompstackLeaseCompTable";
import { DealCompstackSaleCompTable } from "./components/DealCompstackSaleCompTable";
import "./styles.css";

interface DealMarketAnalyticsCompsProps
  extends Omit<CompstackCompsTableCardPropsBase, "title" | "icon">,
    IsRefetchingProp {
  dealId: Deal["id"];
}
const typeFilters = compstackCompTypeLabelValue;

export const DealMarketAnalyticsComps: FC<DealMarketAnalyticsCompsProps> = ({
  tableActions,
  className,
  dealId,
  isRefetching,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState<CompstackCompTypeWithAllKeyLabelValue>(
    typeFilters[0]
  );

  const getLeaseCompTableClasses = (): string => {
    const classes = [className];
    if (type.value !== "all" && type.value !== "lease") {
      classes.push("acq-deal-comps-tables--hidden");
    }
    return classes.join(" ");
  };

  const getSaleCompTableClasses = (): string => {
    const classes = [className];
    if (type.value !== "all" && type.value !== "sale") {
      classes.push("acq-deal-comps-tables--hidden");
    }
    return classes.join(" ");
  };

  const getLandCompTableClasses = (): string => {
    const classes = [className];
    if (type.value !== "all" && type.value !== "land") {
      classes.push("acq-deal-comps-tables--hidden");
    }
    return classes.join(" ");
  };

  return (
    <>
      <DealCompstackLeaseCompTable
        dealId={dealId}
        isRefetching={isRefetching}
        className={getLeaseCompTableClasses()}
        tableActions={tableActions}
      />
      <DealCompstackSaleCompTable
        dealId={dealId}
        isRefetching={isRefetching}
        className={getSaleCompTableClasses()}
        tableActions={tableActions}
      />
      <DealCompstackLandCompTable
        dealId={dealId}
        isRefetching={isRefetching}
        className={getLandCompTableClasses()}
        tableActions={tableActions}
      />
    </>
  );
};

interface DealMarketAnalyticsCompsFilterProps {
  currentType: CompstackCompTypeWithAllKeyLabelValue;
  options: CompstackCompTypeWithAllKeyLabelValue[];
  setType: (option: CompstackCompTypeWithAllKeyLabelValue) => void;
  hidden?: boolean;
}
export const DealMarketAnalyticsCompsFilter: FC<
  DealMarketAnalyticsCompsFilterProps
> = ({ currentType, setType, options, hidden }) => {
  const getClasses = (): string => {
    const classes = ["acq-deal-comps-tables__type-filter"];
    hidden && classes.push("acq-deal-comps-tables__type-filter--hidden");
    return classes.join(" ");
  };

  return (
    <Select
      color="over-ghost"
      className={getClasses()}
      options={options}
      value={currentType}
      onChange={(option) => {
        setType(option);
      }}
    />
  );
};
