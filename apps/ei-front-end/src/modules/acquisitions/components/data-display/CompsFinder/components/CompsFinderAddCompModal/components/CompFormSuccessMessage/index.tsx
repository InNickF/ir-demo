import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { Heading } from "in-ui-react";
import { FC } from "react";

interface CompFormSuccessMessageProps {
  compType: CompstackCompType;
}

export const CompFormSuccessMessage: FC<CompFormSuccessMessageProps> = ({
  compType,
}) => {
  return (
    <div className="px-6 py-6">
      <Heading kind="h5">
        Your comp creation process has begun successfully.
      </Heading>
      <p className="pt-2">
        {`Please allow a few minutes for processing and saving, you will be
        able to view the new ${compType} comp shortly. Thank you for your patience.`}
      </p>
    </div>
  );
};
