import { FC } from "react";
import { Input } from "in-ui-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputsColor } from "in-ui-react/dist/lib/components/utils/types";

interface SearchFieldProps {
  loading: boolean;
  showInput: boolean;
  value: string;
  onChange: (key: string, value: string) => void;
  className?: string;
  color?: InputsColor;
}

export const SearchField: FC<SearchFieldProps> = ({
  loading,
  showInput,
  value,
  onChange,
  className,
  color,
}) => {
  return (
    <>
      {showInput ? (
        <Input
          className={className}
          leftIcon={<MagnifyingGlassIcon />}
          label="Search"
          name="search"
          loading={loading}
          value={value}
          placeholder="Search..."
          onChange={(e) => onChange(e.target.id, e.target.value)}
          color={color}
        />
      ) : null}
    </>
  );
};
