import { GenericTableMetadata } from "@/commons/typings/tables";
import { FC, PropsWithChildren } from "react";
import { getClassesFromMetadata } from "../utils";

interface DynamicTableRowProps extends PropsWithChildren {
  metadata: GenericTableMetadata;
  prefix?: string;
}

export const DynamicTableRow: FC<DynamicTableRowProps> = ({
  metadata,
  children,
  prefix = "deal-financial-dynamic-table",
}) => {
  return (
    <tr className={getClassesFromMetadata({ metadata, prefix })}>{children}</tr>
  );
};
