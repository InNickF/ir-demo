import { HTMLAttributes, PropsWithChildren } from "react";
import { Size } from "../../utils/types";

export type FilterKind = "glass" | "ghost";
export type FilterSize = Size;

export type OptionType = {
  label: string;
  value: string | number;
};

export type ObjectFilterType = Record<string, string | string[]>;

export type FiltersPayloadType = Record<
  string,
  string | string[] | ObjectFilterType
>;

export type FilterTypesType =
  | "text"
  | "simple-select"
  | "multi-select"
  | "custom";

export type CommonFilterAttributes = {
  name: string;
  key: string;
  unDeletable?: boolean;
};

export interface CustomFilterState<P extends FiltersPayloadType> {
  filteredOptions: P;
  isLoading?: boolean;
  onApply: (options: P) => void;
  onClear: () => void;
  filter: CommonFilterAttributes;
}

export type CustomFilterType<
  P extends FiltersPayloadType = FiltersPayloadType
> = {
  render: (state: CustomFilterState<P>) => JSX.Element;
  type: "custom";
} & CommonFilterAttributes;

export type SelectFilterType<T extends OptionType = OptionType> = {
  options: T[];
  type: "simple-select" | "multi-select";
} & CommonFilterAttributes;

export type TextFilterType = {
  type: "text";
} & CommonFilterAttributes;

export type FilterType<T extends OptionType = OptionType> =
  | TextFilterType
  | SelectFilterType<T>
  | CustomFilterType<FiltersPayloadType>;

export interface FiltersProps<
  T extends OptionType,
  P extends FiltersPayloadType
> extends HTMLAttributes<HTMLElement> {
  filters: FilterType<T>[];
  filteredOptions: P;
  isLoading?: boolean;
  className?: string;
  hideTitle?: boolean;
  hideAddButton?: boolean;
  kind?: FilterKind;
  autoInitialFocus?: boolean;
  size?: FilterSize;
  onApply: (options: P) => void;
  onClear?: () => void;
}

export interface FilterInputProps<P extends FiltersPayloadType> {
  filter: TextFilterType;
  filteredOptions: P;
  className?: string;
  isLoading?: boolean;
  kind?: FilterKind;
  unDeletable?: boolean;
  autoInitialFocus?: boolean;
  size?: FilterSize;
  onDelete: (filter: TextFilterType) => void;
  onChange: (filter: P) => void;
}

export interface FilterSelectProps<
  T extends OptionType,
  P extends FiltersPayloadType
> {
  filter: SelectFilterType<T>;
  isMulti?: boolean;
  filteredOptions: P;
  className?: string;
  isLoading?: boolean;
  unDeletable?: boolean;
  kind?: FilterKind;
  autoInitialFocus?: boolean;
  size?: FilterSize;
  onClear: (filter: SelectFilterType<T>) => void;
  onDelete: (filter: SelectFilterType<T>) => void;
  onSelect: (filter: P) => void;
}

export interface FilterCustomProps<P extends FiltersPayloadType> {
  filter: CustomFilterType<P>;
  filteredOptions: P;
  className?: string;
  isLoading?: boolean;
  kind?: FilterKind;
  unDeletable?: boolean;
  autoInitialFocus?: boolean;
  size?: FilterSize;
  onDelete: (filter: CustomFilterType<P>) => void;
  onApply: (filter: P) => void;
  onClear: () => void;
}

export interface MenuSearchProps<T extends OptionType> {
  filter: SelectFilterType<T>;
  pills: T[];
  className?: string;
  unDeletable?: boolean;
  pillAction?: (pill: T) => void;
  onClear: () => void;
  onSearch: (localOptions: T[]) => void;
}

export interface MenuItemButtonProps {
  label: string;
  unDeletable?: boolean;
  className?: string;
  onClick: () => void;
}

export interface MenuHeaderProps extends PropsWithChildren {
  headerTitle: string;
  className?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export interface MenuContainerProps extends PropsWithChildren {
  className?: string;
}

export interface AddFilterButtonProps<T extends OptionType> {
  filters: FilterType<T>[];
  filteredOptions: FiltersPayloadType;
  className?: string;
  kind?: FilterKind;
  size?: FilterSize;
  onDelete: () => void;
  onAdd: (filter: string) => void;
  isLoading?: boolean;
}

export interface ActiveFiltersProps<
  T extends OptionType,
  P extends FiltersPayloadType
> {
  filters: FilterType<T>[];
  filteredOptions: P;
  className?: string;
  hideTitle?: boolean;
  kind?: FilterKind;
  isLoading?: boolean;
  autoInitialFocus?: boolean;
  size?: FilterSize;
  onFiltersChange: (filter: P) => void;
  onDelete: (filter: FilterType<T>["key"]) => void;
  onClear: (filter: FilterType<T>["key"]) => void;
}
