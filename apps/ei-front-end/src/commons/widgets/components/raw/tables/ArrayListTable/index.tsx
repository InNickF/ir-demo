import { GenericTableCellWithFormatter } from "@/commons/components/data-display/GenericTableCellWithFormatter";
import { GenericTableBody } from "@/commons/components/data-display/tables/GenericTableBody";
import { GenericTableHeader } from "@/commons/components/data-display/tables/GenericTableHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { buildLocalPaginatedTableWidgetConfig } from "@/commons/config/tables/array-table";
import { useLocalPagination } from "@/commons/hooks/useLocalPagination";
import { sortItems } from "@/commons/model-in/formatters/sorters";
import { ModelSchema, SharedFilterSchema } from "@/commons/model-in/types";
import { RawWidgetComponent } from "@/commons/model-in/widgets/types";
import { WidgetCard } from "@/commons/widgets/components/general/WidgetCard";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  getCoreRowModel,
  Table as RTable,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { useCallback, useMemo } from "react";
import { z, ZodArray } from "zod";

const columnsHelper = createColumnHelper<z.infer<ModelSchema>>();
const _stableRef = [];
export const ArrayListTable: RawWidgetComponent<
  ModelSchema,
  ZodArray<ModelSchema>,
  SharedFilterSchema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ReturnType<
    ReturnType<
      typeof buildLocalPaginatedTableWidgetConfig<ModelSchema>
    >["build"]
  >
> = ({ useResource, useModel, useConfig, title, useFilters, className }) => {
  const { query: resourceQuery } = useResource();

  const { schema, formatter, pluralLabel, label } = useModel();

  const { query: settingsQuery, setSettings } = useConfig();

  const isLoading = useMemo(
    () => resourceQuery.isLoading || settingsQuery.isLoading,
    [resourceQuery.isLoading, settingsQuery.isLoading]
  );
  const isRefetching = useMemo(
    () => resourceQuery.isRefetching || settingsQuery.isRefetching,
    [resourceQuery.isRefetching, settingsQuery.isRefetching]
  );

  const sortedItems = useMemo(() => {
    const sortBy =
      settingsQuery.data?.settings?.ordering ||
      settingsQuery.data?.settings?.entityLabelKey;

    const result = sortItems({
      items: resourceQuery.data || _stableRef,
      sortBy,
      sorter: formatter.sorter,
    });
    return result;
  }, [resourceQuery.data, settingsQuery.data, formatter.sorter]);

  const { count, currentPage, paginatedItems, setPage, totalPages } =
    useLocalPagination({
      items: sortedItems,
      itemsPerPage: settingsQuery?.data?.settings?.itemsPerPage || 20,
    });

  const onChangeOrdering = useCallback(
    (ordering: string) => {
      // setSettings((currentSettings) => {
      //   return {
      //     ...currentSettings,
      //     ordering,
      //   };
      // });
    },
    [setSettings]
  );

  const columns = useMemo(() => {
    const entityLabelKey = settingsQuery.data?.settings?.entityLabelKey;
    const entityIdKey = settingsQuery.data?.settings?.entityIdKey;
    const urlRedirect = settingsQuery.data?.settings?.urlRedirect;
    const cols = Object.keys(schema.shape)
      .filter(
        (key) =>
          !(settingsQuery?.data?.settings?.keysToIgnore || [])?.includes(
            key as string
          )
      )
      .map((key) => {
        return columnsHelper.accessor(key, {
          header: formatter.header.format({ key: key as keyof ModelSchema })
            .value,
          cell: (info) => (
            <GenericTableCellWithFormatter
              formatter={formatter}
              identifier={key}
              info={info}
              cellProps={{
                size: settingsQuery.data?.settings?.size || "normal",
              }}
              redirectToURL={
                key === entityLabelKey && entityIdKey && urlRedirect
                  ? urlRedirect.replace(
                      /__\s*id\s*__/g,
                      info.row.original?.[entityIdKey]
                    )
                  : null
              }
            />
          ),
        });
      });
    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsQuery.data?.settings?.size]);

  const table = useReactTable({
    data: paginatedItems || _stableRef,
    state: {
      columnVisibility: settingsQuery.data?.settings?.columnVisibility,
      columnOrder: settingsQuery.data?.settings?.columnOrdering,
    },
    onColumnOrderChange: (newOrder) => {
      setSettings((currentSettings) => ({
        ...currentSettings,
        columnOrdering: newOrder as [string, ...string[]],
      }));
    },
    getCoreRowModel: getCoreRowModel(),
    columns,
  });

  return (
    <WidgetCard
      title={title || pluralLabel || `${label} List`}
      icon={<TableCellsIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      className={className}
      bodyPadding={false}
      useConfig={useConfig}
      useFilters={useFilters}
      disableOverflow
    >
      <TableCard.Body>
        <Table
          spreadsheet={settingsQuery?.data?.settings?.spreadsheet}
          stickyData={settingsQuery?.data?.settings?.spreadsheet}
        >
          <GenericTableHeader
            table={table as RTable<unknown>}
            ordering={settingsQuery.data?.settings?.ordering}
            onChangeOrdering={onChangeOrdering}
          />
          <GenericTableBody
            table={table as RTable<unknown>}
            hasData={!isLoading && paginatedItems?.length > 0}
          />
        </Table>
      </TableCard.Body>
      {count || sortedItems?.length ? (
        <Table.Pagination
          total={totalPages}
          current={currentPage}
          onChangePage={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      ) : null}
    </WidgetCard>
  );
};
