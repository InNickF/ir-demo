import {
  GenericTableDefinedNumbers,
  GenericTableMetadata,
  GenericTableBorderLimits,
} from "@/commons/typings/tables";

export interface IGenericTableClasses {
  metadata?: GenericTableMetadata;
  className?: string;
  prefix?: string;
}

export interface IGetCssBordersFromMetadata {
  value: GenericTableBorderLimits;
  prefix?: string;
}

export type MetadataCssOptions = keyof Omit<
  GenericTableMetadata,
  "colspan" | "rowspan" | "table_header" | "table_footer" | "underline"
>;

export type MetadataValueOptions =
  | GenericTableDefinedNumbers
  | GenericTableBorderLimits
  | boolean;

export const getClassesFromMetadata = ({
  metadata,
  className,
  prefix = "financial-dynamic-table",
}: IGenericTableClasses): string | null => {
  if (!metadata || !Object.keys(metadata).length) return null;

  const prefixBorder = `${prefix}__border`;
  const prefixPadding = `${prefix}__padding`;

  const classes = [];

  const options: Record<
    MetadataCssOptions,
    (value: MetadataValueOptions) => string
  > = {
    bold: (value) => value && `${prefix}__bold`,
    border: (value) =>
      getCssBordersFromMetadata({
        value: value as GenericTableBorderLimits,
        prefix: prefixBorder,
      }),
    padding: (value) =>
      getCssBordersFromMetadata({
        value: value as GenericTableBorderLimits,
        prefix: prefixPadding,
      }),
    align: (value) => value && `${prefix}__align-${value}`,
    background: (value) => {
      // get a number between 1 and 6
      /* const randomValue = Math.floor(Math.random() * 6) + 1; */

      return value && `${prefix}__background-${value}`;
    },
    color: (value) => value && `${prefix}__color-${value} ${prefix}--has-color`,
  };

  className && classes.push(className);

  Object.entries(metadata).forEach(([key, value]) => {
    const cssClass = options[key as keyof GenericTableMetadata]?.(value);
    cssClass && classes.push(cssClass);
  });

  return classes.filter(Boolean).join(" ") || null;
};

const getCssBordersFromMetadata = ({
  value,
  prefix,
}: IGetCssBordersFromMetadata): string => {
  if (!value) return "";

  const { top, bottom, left, right } = value;
  const cssBorders = [
    top && `${prefix}-top-${top}`,
    bottom && `${prefix}-bottom-${bottom}`,
    left && `${prefix}-left-${left}`,
    right && `${prefix}-right-${right}`,
  ]
    .filter((cssClass) => !!cssClass)
    .join(" ");
  return cssBorders;
};
