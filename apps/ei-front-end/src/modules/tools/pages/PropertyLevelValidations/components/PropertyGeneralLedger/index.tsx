import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp } from "@/commons/typings";
import { PropertyGeneralLedger as PGLDataType } from "@/modules/tools/typings/property-level-validations";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { CardProps } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { PropertyGeneralLedgerTable } from "./components/PropertyGeneralLedgerTable";

interface PropertyGeneralLedgerProps extends CardProps, IsLoadingProp {
  data: PGLDataType[];
}
export const PropertyGeneralLedger: FC<PropertyGeneralLedgerProps> = ({
  data,
  isLoading,
  ...props
}) => {
  const [search, setSearch] = useState<string>("");
  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      return (
        item.account_code.toLowerCase().includes(search.toLowerCase()) ||
        item.entity_type.toLowerCase().includes(search.toLowerCase()) ||
        item.account_description.toLowerCase().includes(search.toLowerCase()) ||
        item.month_start_balance
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.month_to_date_balance_activity
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title="Trial Balance"
      bodyPadding={false}
      headerActions={<DebouncedSearchInput onSearch={setSearch} />}
      {...props}
    >
      <div className="relative overflow-auto h-96">
        <PropertyGeneralLedgerTable
          data={filteredData || []}
          isLoading={isLoading}
        />
      </div>
    </CardWithHeader>
  );
};
