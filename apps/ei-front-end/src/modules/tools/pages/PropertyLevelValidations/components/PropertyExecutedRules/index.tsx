import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { IsLoadingProp } from "@/commons/typings";
import { PropertyRule } from "@/modules/tools/typings/property-level-validations";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { CardProps, Checkbox } from "in-ui-react";
import { FC, useMemo, useState } from "react";
import { PropertyExecutedRulesTable } from "./components/PropertyExecutedRulesTable";

interface PropertyExecutedRulesProps extends CardProps, IsLoadingProp {
  data: PropertyRule[];
}
export const PropertyExecutedRules: FC<PropertyExecutedRulesProps> = ({
  data,
  isLoading,
  ...props
}) => {
  const [search, setSearch] = useState<string>("");
  const [showSucceeded, setShowSucceeded] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    const hasFailed = data?.some((item) => !item.check_pass);

    return data
      ?.filter((item) => {
        return (
          item?.date?.toLowerCase().includes(search.toLowerCase()) ||
          item?.check_name?.toLowerCase().includes(search.toLowerCase()) ||
          item?.check_code?.toLowerCase().includes(search.toLowerCase())
        );
      })
      .filter((item) => {
        if (!hasFailed || showSucceeded) return true;

        return !item.check_pass;
      });
  }, [data, search, showSucceeded]);

  return (
    <CardWithHeader
      icon={<TableCellsIcon />}
      title="Executed Rules"
      bodyPadding={false}
      headerActions={
        <>
          <Checkbox
            label="Show Passed"
            checked={showSucceeded}
            onChange={(e) => {
              setShowSucceeded(e.target.checked);
            }}
          />
          <DebouncedSearchInput onSearch={setSearch} />
        </>
      }
      {...props}
    >
      <div className="relative overflow-auto h-96">
        <PropertyExecutedRulesTable
          data={filteredData || []}
          isLoading={isLoading}
        />
      </div>
    </CardWithHeader>
  );
};
