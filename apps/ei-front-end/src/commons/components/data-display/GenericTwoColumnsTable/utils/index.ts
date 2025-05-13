import { GenericTwoColumnsTableData } from "../typings";

type RetrieveOrderedColumnDataReturnType = {
  leftColumn: GenericTwoColumnsTableData[];
  rightColumn: GenericTwoColumnsTableData[];
  fullWidthColumns: GenericTwoColumnsTableData[];
};

export const retrieveOrderedColumnData = (
  data: GenericTwoColumnsTableData[]
): RetrieveOrderedColumnDataReturnType => {
  const [leftColumn, rightColumn] = data.reduce(
    (columns, row, index) => {
      if (row.fullWidth) {
        return columns;
      }
      const columnIndex = index % 2;
      columns[columnIndex].push(row);
      return columns;
    },
    [[], []]
  );

  const fullWidthColumns = data.filter((row) => row.fullWidth);

  return {
    leftColumn,
    rightColumn,
    fullWidthColumns,
  };
};
