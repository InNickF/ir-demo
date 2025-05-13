import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { Table } from "in-ui-react";
import { FC, useEffect, useState } from "react";

type TwoColumnsTableRows = {
  label: string;
  value: string | number;
};

interface TwoColumnsTableProps {
  leftColumnRows: TwoColumnsTableRows[];
  rightColumnRows: TwoColumnsTableRows[];
  className?: string;
  forceOneColumn?: boolean;
}

export const TwoColumnsTable: FC<TwoColumnsTableProps> = ({
  leftColumnRows,
  rightColumnRows,
  className,
  forceOneColumn = false,
}) => {
  const [twoColumns, setTwoColumns] = useState(forceOneColumn);

  const getClasses = () => {
    const classes = ["two-columns-table"];
    className && classes.push(className);
    return classes.join(" ");
  };

  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth <= 480) {
        setTwoColumns(false);
      } else {
        setTwoColumns(true);
      }
    };

    // Evaluate handleViewportChange on initial render
    handleViewportChange();

    // Add event listener to handle viewport changes
    window.addEventListener("resize", handleViewportChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <Table className={getClasses()}>
      <Table.Body>
        {twoColumns
          ? leftColumnRows.map((row, index) => (
              <Table.Row key={row.label}>
                <Table.Data>
                  <p className="font-bold">{convertToTitleCase(row.label)}</p>
                </Table.Data>
                <Table.Data>
                  <p>{row.value || genericNoDataText}</p>
                </Table.Data>
                {rightColumnRows[index] && (
                  <>
                    <Table.Data>
                      <p className="font-bold">
                        {convertToTitleCase(rightColumnRows[index].label)}
                      </p>
                    </Table.Data>
                    <Table.Data>
                      <p>{rightColumnRows[index].value || genericNoDataText}</p>
                    </Table.Data>
                  </>
                )}
              </Table.Row>
            ))
          : [...leftColumnRows, ...rightColumnRows].map((row) => (
              <Table.Row key={row.label}>
                <Table.Data>
                  <p className="font-bold">{convertToTitleCase(row.label)}</p>
                </Table.Data>
                <Table.Data>
                  <p>{row.value || genericNoDataText}</p>
                </Table.Data>
              </Table.Row>
            ))}
      </Table.Body>
    </Table>
  );
};
