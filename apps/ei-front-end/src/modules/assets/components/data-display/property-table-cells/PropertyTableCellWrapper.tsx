import { Table, TableDataProps } from "in-ui-react";
import { FC } from "react";

export const PropertyTableCellWrapper: FC<TableDataProps> = ({
  children,
  ...props
}) => {
  return <Table.Data {...props}>{children}</Table.Data>;
};
