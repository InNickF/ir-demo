import { useDebouncedFunction } from "@/commons/hooks/useDebouncedFunction";
import { Input, InputProps } from "in-ui-react";
import { forwardRef } from "react";

interface DebouncedSearchInputProps extends InputProps {
  onSearch: (search: string) => void;
  delay?: number;
}
export const DebouncedSearchInput = forwardRef<
  HTMLInputElement,
  DebouncedSearchInputProps
>(
  (
    {
      onSearch,
      delay = 250,
      placeholder = "Search...",
      color = "glass",
      ...props
    },
    ref
  ) => {
    const debouncedSearch = useDebouncedFunction({
      delay,
      func: onSearch,
    });

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        onChange={(e) => debouncedSearch(e.target.value)}
        color={color}
        {...props}
      />
    );
  }
);

DebouncedSearchInput.displayName = "DebouncedSearchInput";
