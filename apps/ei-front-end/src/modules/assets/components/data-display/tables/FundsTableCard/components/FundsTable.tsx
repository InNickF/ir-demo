import { GenericTableBody } from "@/commons/components/data-display/tables/GenericTableBody";
import { GenericTableHeader } from "@/commons/components/data-display/tables/GenericTableHeader";
import { useFundsTable } from "@/assets/hooks/useFundsTable";
import { Fund } from "@/assets/typings/funds";
import { fundsTableColumns } from "@/assets/utils/funds";
import { IsLoadingProp } from "@/commons/typings";
import { Table } from "in-ui-react";
import { FC } from "react";

interface FundsTableProps extends IsLoadingProp {
  data: Fund[];
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
}
export const FundsTable: FC<FundsTableProps> = ({
  data,
  isLoading,
  ordering,
  onChangeOrdering,
}) => {
  const table = useFundsTable({
    data,
    columns: fundsTableColumns,
  });
  return (
    <>
      <Table spreadsheet stickyData>
        <GenericTableHeader
          table={table}
          ordering={ordering}
          // onChangeOrdering={onChangeOrdering}
        />
        <GenericTableBody
          table={table}
          hasData={!isLoading && data?.length > 0}
        />
      </Table>
    </>
  );
};
