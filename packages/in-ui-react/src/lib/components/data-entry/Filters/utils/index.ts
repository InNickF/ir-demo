import {
  FilterType,
  ObjectFilterType,
  OptionType,
  SelectFilterType,
} from "../props";

type GenerateMultiFilterTextType = {
  name: string;
  value: string[];
  label?: string;
};

type GenerateSingleFilterTextType = Omit<GenerateMultiFilterTextType, "value">;

type MenuButtonTextType = {
  filter: FilterType<OptionType>;
  filteredOption: string | string[] | ObjectFilterType;
};

export const capitalizedText = (name: string) =>
  name.replace(/^\w/, (c) => c.toUpperCase());

export const generateSingleFilterText = ({
  name,
  label,
}: GenerateSingleFilterTextType) => (label ? `${name}: ${label}` : `${name}`);

export const generateMultiFilterText = ({
  name,
  value,
  label,
}: GenerateMultiFilterTextType) =>
  value?.length === 1
    ? `${name}: ${label}`
    : value?.length > 1
    ? `${name}: ${value.length} selected`
    : `${name}`;

const getCustomFilterLabel = (
  filteredOption: MenuButtonTextType["filteredOption"]
) => {
  if (typeof filteredOption === "object") {
    const values = Object.values(filteredOption).map((value) => {
      return Array.isArray(value) ? value.join(", ") : value;
    });
    const nonEmptyValues = values.filter(
      (value) => value !== "" && value !== null && value !== undefined
    );
    const hasJustOneValue = nonEmptyValues.length === 1;
    const firstValue = hasJustOneValue ? nonEmptyValues[0] : null;
    return hasJustOneValue ? firstValue : nonEmptyValues.join(", ");
  }

  if (Array.isArray(filteredOption)) {
    const nonEmptyValues = filteredOption.filter(
      (value) => value !== "" && value !== null && value !== undefined
    );
    return nonEmptyValues.join(", ");
  }

  if (typeof filteredOption === "string") {
    return filteredOption;
  }

  return null;
};

const getSelectFilterLabel = ({
  filter,
  filteredOption,
}: {
  filter: SelectFilterType<OptionType>;
  filteredOption: MenuButtonTextType["filteredOption"];
}) => {
  const label =
    typeof filteredOption === "string"
      ? filter.options.find((option) => option.value === filteredOption)?.label
      : filter.options
          .filter((option) =>
            (filteredOption as unknown as string)?.includes(
              option.value.toString()
            )
          )
          .map((option) => option.label)
          .join(", ");

  return label || null;
};

export const menuButtonText = ({
  filter,
  filteredOption,
}: MenuButtonTextType) => {
  const formattedName = capitalizedText(filter.name);
  let filterLabel = null;

  if (filter.type === "custom" && filteredOption !== undefined) {
    filterLabel = getCustomFilterLabel(filteredOption);
  }

  if (filter.type.includes("select")) {
    filterLabel = getSelectFilterLabel({
      filter: filter as SelectFilterType<OptionType>,
      filteredOption,
    });
  }

  return generateSingleFilterText({
    name: formattedName,
    label: filterLabel || "",
  });
};
