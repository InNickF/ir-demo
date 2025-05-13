import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { FC, forwardRef } from "react";
import { Select } from "../../../data-entry/Select";
import { Button } from "../../../general/Button";
import { TablePaginationProps } from "../props";
import "../styles.css";

/**
 * In UI Table Header Component
 * @see {@link https://todo.com/} for official documentation.
 * * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param current
 * Specifies the current page.
 * @param total
 * Specifies the total number of available pages.
 * @param onChangePage
 * Specifies the change page handler.
 * @interface TablePaginationProps
 * This is the custom interface created for this component logic.
 * @interface HTMLDivElement
 * @returns
 * A inUI Table Header react component
 */

type SelectOptions = {
  label: string;
  value: number;
};

type PageSelectorProps = Pick<
  TablePaginationProps,
  "total" | "current" | "onChangePage" | "className"
>;

const PageSelector: FC<PageSelectorProps> = ({
  total,
  current,
  onChangePage,
  className,
}) => {
  const SelectOptions: SelectOptions[] = Array.from(
    Array(total).keys(),
    (n: number) => {
      const realValue = n + 1;
      return { label: realValue.toString(), value: realValue };
    }
  );

  return (
    <Select
      className={className}
      options={SelectOptions}
      value={SelectOptions.find((option) => option.value === current) || null}
      onChange={(original) => original && onChangePage(original.value)}
    />
  );
};

export const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ total, current, className, onChangePage, ...props }, ref) => {
    const prefix = "in-ui-table__pagination";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      !total && classes.push(`${prefix}--hidden`);
      return classes.join(" ");
    };

    const PaginationText = () => (
      <p className={`${prefix}-text`}>of {total} pages</p>
    );

    const ArrowButtons = () => {
      return (
        <div className={`${prefix}-actions`}>
          <Button
            kind="ghost"
            icon={<ChevronLeftIcon />}
            onlyIcon
            disabled={current === 1}
            onClick={() => {
              onChangePage(current - 1);
            }}
          />
          <Button
            kind="ghost"
            icon={<ChevronRightIcon />}
            onlyIcon
            disabled={current === total}
            onClick={() => {
              onChangePage(current + 1);
            }}
          />
        </div>
      );
    };

    return (
      <div className={getClasses()} {...props} ref={ref}>
        <PageSelector
          current={current}
          total={total}
          onChangePage={onChangePage}
          className={`${prefix}-select`}
        />
        <PaginationText />
        <ArrowButtons />
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";
