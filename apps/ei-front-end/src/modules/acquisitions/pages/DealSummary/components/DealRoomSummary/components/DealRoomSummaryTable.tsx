import { FC } from "react";
import { Button, Table, Tooltip } from "in-ui-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import { DealRoomItem } from "@/acquisitions/typings/deals";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { IsLoadingProp } from "@/commons/typings";

const columnHelper = createColumnHelper<DealRoomItem>();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 85,
    cell: (info) => genericGetValue(info.getValue()),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    size: 15,
    cell: (props) => <Actions {...props.row.original} />,
  }),
];

const Actions: FC<DealRoomItem> = ({ file }) => {
  return (
    <Tooltip content="Download File">
      <Button
        as="a"
        href={file}
        target="_blank"
        size="big"
        onlyIcon
        icon={<ArrowDownTrayIcon />}
        kind="ghost"
      />
    </Tooltip>
  );
};

export const DealRoomTable: FC<{ files: DealRoomItem[] } & IsLoadingProp> = ({
  files,
  isLoading,
}) => {
  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <Table.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Header
                  key={header.id}
                  style={{
                    width: header.column.columnDef.size,
                  }}
                >
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
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Data
                  key={cell.id}
                  style={{
                    width: `${cell.column.columnDef.size}%`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Data>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <TableLoaderAndNoData isLoading={isLoading} data={files} />
    </>
  );
};
