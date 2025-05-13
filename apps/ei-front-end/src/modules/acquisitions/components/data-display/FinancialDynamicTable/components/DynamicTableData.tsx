import { GenericTableMetadata } from "@/commons/typings/tables";
import { FC, memo, useMemo } from "react";
import { getClassesFromMetadata } from "../utils";

interface DynamicTableDataProps {
  value: string;
  metadata: GenericTableMetadata;
  prefix?: string;
}

export const DynamicTableData: FC<DynamicTableDataProps> = ({
  value,
  metadata,
  prefix = "deal-financial-dynamic-table",
}) => {
  const {
    underline,
    colspan: colSpan,
    rowspan: rowSpan,
    table_header,
  } = metadata ?? {};

  const CellValue = useMemo(() => {
    const MemoizedCellValue = memo(() => {
      return value ? (
        <div>
          {underline ? (
            <span className={`${prefix}__underline`}>{value}</span>
          ) : (
            value
          )}
        </div>
      ) : null;
    });
    MemoizedCellValue.displayName = "CellValue";

    return MemoizedCellValue;
  }, [underline, value, prefix]);

  const cellProps = useMemo(
    () => ({
      colSpan,
      rowSpan,
      className: getClassesFromMetadata({ metadata, prefix }),
    }),
    [colSpan, rowSpan, metadata, prefix]
  );

  // Determine the element type based on the `table_header` prop
  const ElementType = table_header ? "th" : "td";

  return (
    <ElementType {...cellProps}>
      <CellValue />
    </ElementType>
  );
};
