import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { PropertyFinancialOverviewViews } from "@/modules/tools/typings/property-level-validations";
import { FINANCIAL_OVERVIEW_VIEWS } from "@/modules/tools/utils/property-level-validations";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FC, useState, useMemo } from "react";
import { PropertyFinancialOverviewSelect } from "./components/PropertyFinancialOverviewSelect";
import { PropertyJournalEntries } from "./components/PropertyJournalEntries";
import { PropertyAccountReceivables } from "./components/PropertyAccountReceivables";
import { PropertyBalanceSheets } from "./components/PropertyBalanceSheets";

interface PropertyFinancialOverviewCardProps {
  className?: string;
}

export const PropertyFinancialOverviewCard: FC<
  PropertyFinancialOverviewCardProps
> = ({ className }) => {
  const [overviewView, setOverviewView] =
    useState<PropertyFinancialOverviewViews>(FINANCIAL_OVERVIEW_VIEWS[0]);

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const componentsMap = {
    [FINANCIAL_OVERVIEW_VIEWS[0]]: <PropertyBalanceSheets />,
    [FINANCIAL_OVERVIEW_VIEWS[1]]: <PropertyAccountReceivables />,
    [FINANCIAL_OVERVIEW_VIEWS[2]]: <PropertyJournalEntries />,
    // Add other mappings here based on the views
  };

  const selectedComponent = useMemo(
    () => componentsMap[overviewView] || null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overviewView]
  );

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title="Financial Overview"
      bodyPadding={false}
      headerActions={
        <PropertyFinancialOverviewSelect
          value={overviewView}
          onChange={(option) => {
            setOverviewView(option);
          }}
        />
      }
      className={getClasses()}
    >
      {selectedComponent}
    </CardWithHeader>
  );
};
