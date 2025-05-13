import { forwardRef, useState } from "react";
import { Button } from "../../general/Button";
import { PaginationProps } from "./props";
import { TriggerType, TriggerState } from "./types";
import { getPaginationSelector } from "./utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import "./styles.css";

/**
 * In UI Pagination Component
 * @see {@link https://todo.com/} for official documentation.
 * @param className
 * Default: undefined |
 * You can use this prop to send a string with your custom css classes.
 * @param current
 * Default: 1 |
 * Specifies the current page.
 * @param size
 * Default: 10 |
 * Specifies the page selector size.
 * @param total
 * Specifies the total number of available pages.
 * @param onChangePage
 * Specifies the change page handler.
 * @param loading
 * Specifies if the page selected is loading.
 * @interface PaginationProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI pagination react component
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      current = 1,
      size = 9,
      total,
      onChangePage,
      loading = false,
      ...props
    },
    ref
  ) => {
    const prefix = "in-ui-pagination";
    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      className && classes.push(className);
      return classes.join(" ");
    };

    const [triggerState, setTriggerState] = useState<TriggerState | null>(null);

    const changePage = (pageNumber: number, triggerType: TriggerType): void => {
      if (onChangePage) {
        setTriggerState({
          type: triggerType,
          pageNumber: pageNumber,
        });
        onChangePage(pageNumber);
      }
    };

    const PageSelector = (): JSX.Element => {
      const values = getPaginationSelector(current, total, size);

      const getValues = () => {
        if (!values.includes(1) && !values.includes(total)) {
          return values.slice(2, values.length - 2);
        }
        if (!values.includes(1)) {
          return values.slice(2);
        }
        if (!values.includes(total)) {
          return values.slice(0, values.length - 2);
        }
        return values;
      };

      const isLoadingPageNumber = (pageNumber: number): boolean => {
        return (
          loading &&
          triggerState !== null &&
          triggerState.type == "page" &&
          triggerState.pageNumber == pageNumber
        );
      };

      const EllipsisWrapper = () => (
        <span className={`${prefix}__ellipsis-wrapper`}>...</span>
      );

      const FirstPageSelector = (): JSX.Element => {
        return (
          <>
            {!values.includes(1) && (
              <>
                <Button
                  kind="ghost"
                  squared
                  onClick={() => {
                    changePage(1, "page");
                  }}
                  loading={isLoadingPageNumber(1)}
                >
                  1
                </Button>
                <EllipsisWrapper />
              </>
            )}
          </>
        );
      };

      const LastPageSelector = (): JSX.Element => {
        return (
          <>
            {!values.includes(total) && (
              <>
                <EllipsisWrapper />
                <Button
                  kind="ghost"
                  squared
                  onClick={() => {
                    changePage(total, "page");
                  }}
                  loading={isLoadingPageNumber(total)}
                >
                  {total}
                </Button>
              </>
            )}
          </>
        );
      };

      return (
        <>
          <FirstPageSelector />
          {getValues().map((value) => {
            return value == current ? (
              <Button kind="solid" squared key={value}>
                {value}
              </Button>
            ) : (
              <Button
                kind="ghost"
                squared
                key={value}
                onClick={() => {
                  changePage(value, "page");
                }}
                loading={isLoadingPageNumber(value)}
              >
                {value}
              </Button>
            );
          })}
          <LastPageSelector />
        </>
      );
    };

    const isLoadingPrev = (): boolean => {
      return loading && triggerState !== null && triggerState.type == "prev";
    };

    const isLoadingNext = (): boolean => {
      return loading && triggerState !== null && triggerState.type == "next";
    };

    return (
      <div ref={ref} className={getClasses()} {...props}>
        <Button
          kind="solid"
          icon={<ChevronLeftIcon />}
          squared
          onlyIcon
          disabled={current == 1}
          loading={isLoadingPrev()}
          onClick={() => {
            changePage(current - 1, "prev");
          }}
        />
        <PageSelector />
        <Button
          kind="solid"
          icon={<ChevronRightIcon />}
          squared
          onlyIcon
          disabled={current == total}
          loading={isLoadingNext()}
          onClick={() => {
            changePage(current + 1, "next");
          }}
        />
      </div>
    );
  }
);
Pagination.displayName = "Pagination";
