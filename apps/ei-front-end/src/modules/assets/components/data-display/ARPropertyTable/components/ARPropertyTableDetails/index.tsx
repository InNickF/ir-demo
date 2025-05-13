import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { IsLoadingProp } from "@/commons/typings";
import { ARPropertyTable } from "@/modules/assets/typings/portfolio";
import { flexRender } from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { FC, useMemo } from "react";
import { ARPropertyTableRow } from "./components/ARPropertyTableRow";
import { useARPropertyTable } from "./hooks/useARPropertyTable";
import { getARPropertyTableAndTotals } from "./utils";

interface ARPropertyTableDetailsProps extends IsLoadingProp {
  data: ARPropertyTable;
  className?: string;
}
export const ARPropertyTableDetails: FC<ARPropertyTableDetailsProps> = ({
  data,
  isLoading,
}) => {
  const finalData = useMemo(
    () => getARPropertyTableAndTotals({ data }),
    [data]
  );

  const table = useARPropertyTable({
    data: finalData,
  });
  return (
    <>
      <Table>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Header>
              ))}
            </Table.Row>
          ))}
        </Table.Head>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <ARPropertyTableRow key={row.id} row={row} />
          ))}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={finalData || []} />
    </>
  );
};
