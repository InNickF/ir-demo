import { Table, TableDataProps } from "in-ui-react";
import { FC } from "react";
import { GenericTwoColumnsTableData } from "../../typings";

interface TableLabelValueDataProps extends TableDataProps {
  td: GenericTwoColumnsTableData;
  boldKeys?: boolean;
  className?: string;
}

export const TableLabelValueData: FC<TableLabelValueDataProps> = ({
  td,
  boldKeys,
  colSpan,
  className,
  ...props
}) => {
  return (
    <>
      {Object.entries(td).map(([key, value], index) => {
        const getClasses = () => {
          const classes = [];
          className && classes.push(className);
          boldKeys && index === 0 && classes.push("font-bold");
          index > 0 && classes.push("text-end");
          return classes.join(" ");
        };

        return (
          <>
            {key !== "fullWidth" ? (
              <Table.Data
                key={index}
                className={getClasses()}
                colSpan={colSpan || 1}
                {...props}
              >
                {value}
              </Table.Data>
            ) : null}
          </>
        );
      })}
    </>
  );
};
