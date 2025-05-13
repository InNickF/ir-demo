import { Button, ButtonProps } from "in-ui-react";
import { FC } from "react";

interface ShowAllFieldsButtonProps extends Omit<ButtonProps<"button">, "as"> {
  isFullForm: boolean;
}

export const ShowAllFieldsButton: FC<ShowAllFieldsButtonProps> = ({
  isFullForm,
  onClick,
  ...props
}) => {
  return (
    <>
      {!isFullForm ? (
        <Button
          kind="outline"
          onClick={onClick}
          className={!isFullForm ? "mb-6" : "hidden"}
          {...props}
        >
          Show all fields
        </Button>
      ) : null}
    </>
  );
};
