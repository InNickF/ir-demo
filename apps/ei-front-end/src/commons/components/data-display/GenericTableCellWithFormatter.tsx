import { Formatter } from "@/commons/model-in/formatters/types";
import { slicedTextWithEllipsis } from "@/commons/model-in/formatters/utils";
import { CellContext } from "@tanstack/react-table";
import { Link, Table, TableDataProps, Tooltip } from "in-ui-react";
import { default as NextLink } from "next/link";
import { FC, PropsWithChildren, useMemo } from "react";

interface GenericTableCellWithFormatterProps<
  TModel,
  TWrapper extends FC<PropsWithChildren> = FC<PropsWithChildren>
> {
  info: CellContext<TModel, TModel[keyof TModel]>;
  identifier: keyof TModel;
  formatter: Formatter<TModel>;
  redirectToURL?: string;
  maxContentLength?: number;
  CellWrapper?: TWrapper;
  cellProps?: Omit<TableDataProps, "children">;
}
export const GenericTableCellWithFormatter = <
  TModel,
  TWrapper extends FC<PropsWithChildren> = FC<PropsWithChildren>
>({
  info,
  identifier,
  maxContentLength = 60,
  redirectToURL,
  formatter,
  CellWrapper,
  cellProps,
}: GenericTableCellWithFormatterProps<TModel, TWrapper>) => {
  const { value, className } = formatter.value.format({
    key: identifier,
    value: info?.getValue() as unknown as TModel[keyof TModel],
  });
  const isTooLong = value?.length > maxContentLength;
  const slicedValue = slicedTextWithEllipsis({
    text: value,
    maxLength: maxContentLength,
  });

  const Cell = useMemo(() => {
    return CellWrapper || GenericTableCellWrapper;
  }, [CellWrapper]);

  return (
    <Cell {...cellProps} className={className}>
      {isTooLong ? (
        <Tooltip content={value} hidden={!isTooLong}>
          <CellContent redirectToURL={redirectToURL}>{slicedValue}</CellContent>
        </Tooltip>
      ) : (
        <CellContent redirectToURL={redirectToURL}>{value}</CellContent>
      )}
    </Cell>
  );
};

interface CellContentProps {
  redirectToURL: string;
}
const CellContent: FC<PropsWithChildren<CellContentProps>> = ({
  redirectToURL,
  children,
}) => {
  if (redirectToURL) {
    return (
      <NextLink href={redirectToURL}>
        <Link>{children}</Link>
      </NextLink>
    );
  }

  return <>{children}</>;
};

export const GenericTableCellWrapper: FC<TableDataProps> = ({
  children,
  ...props
}) => {
  return <Table.Data {...props}>{children}</Table.Data>;
};
