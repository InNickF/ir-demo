import { IsLoadingProp } from "@/commons/typings";
import { usePropertiesTable } from "@/modules/assets/hooks/usePropertiesTable";
import { Property } from "@/modules/assets/typings/properties";
import { propertiesTableColumns } from "@/modules/assets/utils/properties";
import { Table } from "in-ui-react";
import { FC } from "react";
import { AssetsTableBody } from "./AssetsTableBody";
import { AssetsTableHeader } from "./AssetsTableHeader";

interface AssetsTableProps extends IsLoadingProp {
  data: Property[];
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
}
export const AssetsTable: FC<AssetsTableProps> = ({
  data,
  isLoading,
  ordering,
  onChangeOrdering,
}) => {
  const table = usePropertiesTable({
    data,
    columns: propertiesTableColumns,
  });
  return (
    <Table spreadsheet stickyData>
      <AssetsTableHeader
        table={table}
        ordering={ordering}
        // onChangeOrdering={onChangeOrdering}
      />
      <AssetsTableBody table={table} hasData={!isLoading && data?.length > 0} />
    </Table>
  );
};
