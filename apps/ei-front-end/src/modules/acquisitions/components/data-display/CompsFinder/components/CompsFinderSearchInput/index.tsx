import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input, InputProps, setComponentRefs } from "in-ui-react";
import { forwardRef, useRef } from "react";
import "./styles.css";

interface CompsFinderSearchInputProps extends InputProps {
  onSearch: (search: string) => void;
  onClear?: () => void;
}

export const CompsFinderSearchInput = forwardRef<
  HTMLInputElement,
  CompsFinderSearchInputProps
>(({ onSearch, onClear, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit} className="acq-comps-finder-search-form">
      <Input
        {...props}
        ref={setComponentRefs(inputRef, ref)}
        name="search"
        placeholder="Search..."
        className="acq-comps-finder-search-input"
        rightIcon={onClear ? <XMarkIcon /> : null}
        rightIconAction={onClear}
      />
      <Button
        className="p-2.5"
        type="submit"
        size="small"
        onlyIcon
        icon={<MagnifyingGlassIcon />}
      />
    </form>
  );
});

CompsFinderSearchInput.displayName = "CompFinderSearchInput";
