import { FC } from "react";
import { Button } from "in-ui-react";
import { IsLoadingProp } from "@/commons/typings";

export const ApplyButton: FC<{ onClick: () => void } & IsLoadingProp> = ({
  onClick,
  isLoading,
}) => {
  return (
    <>
      <Button onClick={onClick} loading={isLoading} kind="solid">
        Apply
      </Button>
    </>
  );
};
