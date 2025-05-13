import {
  Bars2Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { forwardRef } from "react";
import { TableHeaderProps } from "../props";
import "../styles.css";

type OrderingOption = {
  key: string;
  icon: () => JSX.Element;
};

/**
 * In UI Table Header Component
 * @see {@link https://todo.com/} for official documentation.
 * @param ordering
 * Shared sorting state from the parent
 * @param orderingKey
 * Identifier sorting key to send as param
 * @param onOrdering
 * Table header sorting click event handler
 * @interface HTMLTableCellElement
 * @returns
 * A inUI Table Header react component
 */
export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  (
    {
      children,
      className,
      ordering,
      orderingKey,
      onOrdering,
      onClick,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-table__header";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      orderingKey && classes.push(`${prefix}-clickable`);
      return classes.join(" ");
    };

    const orderingOptions: OrderingOption[] = [
      {
        key: `${orderingKey}`,
        icon: () => {
          return <BarsArrowUpIcon />;
        },
      },
      {
        key: `-${orderingKey}`,
        icon: () => {
          return <BarsArrowDownIcon />;
        },
      },
      {
        key: "",
        icon: () => {
          return <Bars2Icon />;
        },
      },
    ];

    const SelectedOrdering = () => {
      const { icon: ChosenOrdering } = orderingOptions.find(
        ({ key }) => key === ordering || key === ""
      ) as OrderingOption;

      return (
        <div className="in-ui-table__header-arrow">
          <ChosenOrdering />
        </div>
      );
    };

    const handleOrdering = () => {
      if (!orderingKey) {
        return;
      }
      const orderingIndex = orderingOptions.findIndex(
        ({ key }) => key === ordering
      );
      const nextOrdering =
        orderingIndex + 1 < orderingOptions.length ? orderingIndex + 1 : 0;

      onOrdering(orderingOptions[nextOrdering].key);
    };

    const handleOnClick = (
      event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) => {
      if (onClick) {
        onClick(event);
      }
      if (orderingKey) {
        handleOrdering();
      }
    };

    return (
      <th
        className={getClasses()}
        {...props}
        ref={ref}
        onClick={onClick || orderingKey ? handleOnClick : undefined}
      >
        <div className="in-ui-table__header-wrapper">
          {children}
          {orderingKey ? <SelectedOrdering /> : null}
        </div>
      </th>
    );
  }
);

TableHeader.displayName = "TableHeader";
