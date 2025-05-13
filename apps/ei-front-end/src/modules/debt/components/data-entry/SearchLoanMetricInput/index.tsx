import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Input, InputProps } from "in-ui-react";
import { FC } from "react";

export const SearchLoanMetricInput: FC<InputProps> = (props) => {
  return (
    <Input
      label="Search Metric"
      placeholder="Search metrics..."
      leftIcon={<MagnifyingGlassIcon />}
      rightIcon={props.value ? <XMarkIcon /> : undefined}
      className="max-w-[350px]"
      {...props}
    />
  );
};
