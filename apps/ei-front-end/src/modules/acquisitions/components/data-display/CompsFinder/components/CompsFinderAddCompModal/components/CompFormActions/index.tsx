import { Button } from "in-ui-react";
import { FC } from "react";

interface CompFormActionsProps {
  onClose?: () => void;
  isLoading?: boolean;
  hideSaveButton?: boolean;
}

export const CompFormActions: FC<CompFormActionsProps> = ({
  onClose,
  isLoading = false,
  hideSaveButton = false,
}) => {
  return (
    <div className="flex">
      <Button
        kind={hideSaveButton ? "solid" : "ghost"}
        block
        onClick={() => {
          onClose && onClose();
        }}
      >
        Close
      </Button>
      {!hideSaveButton ? (
        <Button block type="submit" disabled loading={isLoading}>
          Save
        </Button>
      ) : null}
    </div>
  );
};
