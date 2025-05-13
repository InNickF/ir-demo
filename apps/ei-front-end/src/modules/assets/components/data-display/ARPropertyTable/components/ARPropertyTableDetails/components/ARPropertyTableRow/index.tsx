import { ARTenantRow } from "@/modules/assets/typings/portfolio";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { flexRender, Row } from "@tanstack/react-table";
import { Button, Table } from "in-ui-react";
import { FC, useState } from "react";
import { TenantDrillDownDetails } from "../../../TenantDrillDownDetails";
import { getARTenantDrillDownAndTotals } from "../../utils";
import "./styles.css";

type TenantRow = Row<ARTenantRow>;
interface ARPropertyTableRowProps {
  row: TenantRow;
}

const hasDrillDown = (row: TenantRow): boolean => {
  return !!row.original?.drill_down;
};

interface HasDrillDownButtonArgs {
  index: number;
  row: TenantRow;
}
const hasDrillDownButton = ({
  row,
  index,
}: HasDrillDownButtonArgs): boolean => {
  return index === 0 && hasDrillDown(row);
};

export const ARPropertyTableRow: FC<ARPropertyTableRowProps> = ({ row }) => {
  const [isOpenDrillDown, setIsOpenDrillDown] = useState(false);

  const handleShowDrillDown = () => {
    if (!hasDrillDown(row)) return;
    setIsOpenDrillDown((prev) => !prev);
  };

  const getClasses = (): string => {
    const classes = ["assets-ar-property-table-row"];
    if (isOpenDrillDown) {
      classes.push("assets-ar-property-table-row--active");
    }
    return classes.join(" ");
  };

  return (
    <>
      <Table.Row
        key={row.id}
        className={getClasses()}
        onClick={() => {
          handleShowDrillDown();
        }}
      >
        {row.getVisibleCells().map((cell, index) => (
          <Table.Data key={cell.id}>
            {hasDrillDownButton({
              index,
              row,
            }) ? (
              <Button
                className="mr-2"
                onlyIcon
                kind="ghost"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowDrillDown();
                }}
                icon={isOpenDrillDown ? <ChevronUpIcon /> : <ChevronDownIcon />}
              />
            ) : null}

            {flexRender(
              isOpenDrillDown && index > 0 ? null : cell.column.columnDef.cell,
              cell.getContext()
            )}
          </Table.Data>
        ))}
      </Table.Row>
      {hasDrillDown(row) ? (
        <Table.Row className={isOpenDrillDown ? undefined : "hidden"}>
          <Table.Data
            className="p-4 pb-8 bg-ghost-contrast-2"
            colSpan={row.getVisibleCells().length}
          >
            <TenantDrillDownDetails
              data={getARTenantDrillDownAndTotals({
                drillDown: row.original?.drill_down,
                totals: row.original?.totals,
              })}
              tenantName={row.original?.name}
            />
          </Table.Data>
        </Table.Row>
      ) : null}
    </>
  );
};
