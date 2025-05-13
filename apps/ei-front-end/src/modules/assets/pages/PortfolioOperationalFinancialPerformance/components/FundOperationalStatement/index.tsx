import {
  CardWithHeader,
  CardWithHeaderProps,
} from "@/commons/components/general/CardWithHeader";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { FundOperationalStatementTable } from "./components/FundOperationalStatementTable";
import { FC, useMemo, useState } from "react";
import { FundOperationalStatement as FundOperationalStatementType } from "@/modules/assets/typings/operational-financial-performance";
import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { MetricSelector } from "./components/MetricSelector";

interface FundOperationalStatementProps
  extends Omit<
    CardWithHeaderProps,
    "title" | "icon" | "children" | "bodyPadding" | "headerActions"
  > {
  data: FundOperationalStatementType[];
  activeComparison: string;
}
export const FundOperationalStatement: FC<FundOperationalStatementProps> = ({
  data = [],
  activeComparison,
  ...props
}) => {
  const [search, setSearch] = useState<string>("");
  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      return item?.name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  return (
    <CardWithHeader
      title="Operational Property Comparison"
      icon={<TableCellsIcon />}
      bodyPadding={false}
      disableOverflow
      hasDataToShow={filteredData.length > 0}
      loaderKind="chart"
      headerActions={
        <>
          <MetricSelector />
          <DebouncedSearchInput
            placeholder="Search Asset..."
            onSearch={setSearch}
          />
        </>
      }
      {...props}
    >
      <FundOperationalStatementTable
        data={filteredData}
        activeComparison={activeComparison}
      />
    </CardWithHeader>
  );
};
