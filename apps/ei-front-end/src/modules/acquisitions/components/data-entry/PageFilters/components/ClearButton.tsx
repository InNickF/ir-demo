import { FC } from "react";
import { Button } from "in-ui-react";

export const ClearButton: FC<{
  hasFilters: boolean;
  onClick: () => void;
}> = ({ hasFilters, onClick }) => {
  return (
    <>
      {hasFilters ? (
        <Button onClick={onClick} kind="outline">
          Clear
        </Button>
      ) : null}
    </>
  );
};
