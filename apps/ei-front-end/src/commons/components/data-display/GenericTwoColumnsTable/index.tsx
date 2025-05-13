import { Size, Table } from "in-ui-react";
import { FC, useEffect, useState } from "react";
import { TableLabelValueData } from "./components/TableLabelValueData";
import "./styles.css";
import { GenericTwoColumnsTableProps } from "./typings";
import { retrieveOrderedColumnData } from "./utils";

export const GenericTwoColumnsTable: FC<GenericTwoColumnsTableProps> = ({
  data,
  className,
  forceOneColumn = false,
  boldKeys = true,
  size = "normal",
}) => {
  const { leftColumn, rightColumn, fullWidthColumns } =
    retrieveOrderedColumnData(data);

  const [twoColumns, setTwoColumns] = useState(!forceOneColumn);

  const getClasses = () => {
    const classes = ["commons-two-columns-table"];
    className && classes.push(className);
    return classes.join(" ");
  };

  const getRowClasses = () => {
    const rowSizeClasses: Record<Size, string> = {
      big: "py-4",
      normal: "py-2",
      small: "py-1",
    };
    const classes = [rowSizeClasses[size]];
    return classes.join(" ");
  };

  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth = window.innerWidth;
      setTwoColumns(viewportWidth > 480 && !forceOneColumn);
    };

    // Evaluate handleViewportChange on initial render
    handleViewportChange();

    // Add event listener to handle viewport changes
    window.addEventListener("resize", handleViewportChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [forceOneColumn]);

  return (
    <Table className={getClasses()}>
      <Table.Body>
        {fullWidthColumns?.length ? (
          <Table.Row>
            {fullWidthColumns?.map((row, index) => (
              <TableLabelValueData
                key={index}
                td={row}
                colSpan={twoColumns ? 2 : null}
                boldKeys={boldKeys}
              />
            ))}
          </Table.Row>
        ) : null}

        {twoColumns
          ? leftColumn.map((row, index) => (
              <Table.Row key={row.label}>
                <TableLabelValueData
                  td={row}
                  boldKeys={boldKeys}
                  className={getRowClasses()}
                />
                {!row.fullWidth && rightColumn[index] && (
                  <TableLabelValueData
                    td={rightColumn[index]}
                    boldKeys={boldKeys}
                  />
                )}
              </Table.Row>
            ))
          : [...leftColumn, ...rightColumn].map((row) => (
              <Table.Row key={row.label}>
                <TableLabelValueData
                  td={row}
                  boldKeys={boldKeys}
                  className={getRowClasses()}
                />
              </Table.Row>
            ))}
      </Table.Body>
    </Table>
  );
};
