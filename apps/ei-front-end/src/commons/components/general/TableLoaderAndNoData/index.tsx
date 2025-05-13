import { FC } from "react";
import { Empty, Loader } from "in-ui-react";
import "./styles.css";

interface TableLoaderAndNoDataProps {
  isLoading: boolean;
  data?: unknown[];
}

export const TableLoaderAndNoData: FC<TableLoaderAndNoDataProps> = ({
  isLoading,
  data,
}) => {
  const noData = !data?.length;
  return (
    <>
      {noData && isLoading ? (
        <div className="table-loader-no-data-container">
          <Loader size="big" />
        </div>
      ) : null}
      {noData && !isLoading ? (
        <div className="table-loader-no-data-container">
          <Empty />
        </div>
      ) : null}
    </>
  );
};
