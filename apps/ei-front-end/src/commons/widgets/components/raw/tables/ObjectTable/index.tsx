import { buildLocalPaginatedTableWidgetConfig } from "@/commons/config/tables/array-table";
import { ModelSchema, SharedFilterSchema } from "@/commons/model-in/types";
import { RawWidgetComponent } from "@/commons/model-in/widgets/types";
import { WidgetCard } from "@/commons/widgets/components/general/WidgetCard";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "in-ui-react";
import { Fragment, useMemo } from "react";
import { z } from "zod";
import { Grid } from "./components/Grid";
import { Element } from "./components/Element";

const columnsHelper = createColumnHelper<z.infer<ModelSchema>>();
const _stableRef = [];
export const ArrayListTable: RawWidgetComponent<
  ModelSchema,
  ModelSchema,
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

  const columns = useMemo(() => {
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
            <Element
              title={
                formatter.header.format({ key: key as keyof ModelSchema }).value
              }
              value={
                formatter.value.format({
                  key,
                  value: info.getValue(),
                  original: info.row.original,
                }).value
              }
            />
          ),
        });
      });
    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsQuery.data?.settings?.size]);

  const table = useReactTable({
    data: resourceQuery?.data ? [resourceQuery?.data] : _stableRef,
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
      hasDataToShow={!isLoading && !!resourceQuery?.data}
      disableOverflow
    >
      <Grid>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Fragment>
            ))}
          </Table.Row>
        ))}
      </Grid>
    </WidgetCard>
  );
};
