import { Skeleton } from "in-ui-react";
import React from "react";

export const CompstackCompTotalsTableLoader = () => {
  const classNames = "h-5 w-14 m-0";
  return (
    <Skeleton className={classNames}>
      <Skeleton.Avatar className={classNames} shape="squared" />
    </Skeleton>
  );
};
