import {
  MouseEventHandler,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { setComponentRefs } from "../../../../utils/refs";
import { TableDataProps } from "../../props";
import { useOnPressEscape } from "./hooks/useOnPressEscape";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { useOutsideDoubleClick } from "./hooks/useOutsideDoubleClick";
import "./styles.css";

/**
 * In UI Table Data Component
 * @see {@link https://todo.com/} for official documentation.
 * @returns
 * A inUI Table Data react component
 */

export const TableData = forwardRef<HTMLTableCellElement, TableDataProps>(
  (
    {
      children,
      className,
      secondSlot,
      onSecondSlot,
      onLeaveSecondSlot,
      onLeaveSecondSlotWithEscape,
      onLeaveSecondSlotWithClick,
      onLeaveSecondSlotWithDoubleClick,
      onDoubleClick,
      wrapText,
      spreadsheetLineColor = "ghost",
      size = "normal",
      textAlignment = "left",
      monospaceFont,
      ...props
    },
    forwardRef
  ) => {
    const prefix = "in-ui-table__data";
    const ref = useRef<HTMLTableCellElement>(null);
    const [showSecondSlot, setShowSecondSlot] = useState(false);

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`];
      secondSlot && classes.push(`${prefix}--has-second-slot`);
      className && classes.push(className);
      textAlignment && classes.push(`${prefix}--${textAlignment}`);
      monospaceFont && classes.push(`${prefix}--monospace-font`);
      spreadsheetLineColor &&
        classes.push(`${prefix}--spreadsheet-${spreadsheetLineColor}`);
      size && classes.push(`${prefix}--${size}`);
      !wrapText && classes.push(`${prefix}--nowrap-text`);
      return classes.join(" ");
    };

    const showSecondSlotHandler: MouseEventHandler<HTMLTableCellElement> = (
      e
    ) => {
      if (!onDoubleClick && !secondSlot) return;
      onDoubleClick?.(e);
      onSecondSlot?.({
        isShowingSecondSlot: showSecondSlot,
        setSecondSlot: setShowSecondSlot,
      });
      setShowSecondSlot(true);
    };

    const onLeaveHandler = useCallback(() => {
      if (!secondSlot) return;
      onLeaveSecondSlot?.({
        isShowingSecondSlot: showSecondSlot,
        setSecondSlot: setShowSecondSlot,
      });
      setShowSecondSlot(false);
    }, [onLeaveSecondSlot]);

    const onLeaveSecondSlotWithEscapeHandler = useCallback(() => {
      if (!secondSlot) return;
      onLeaveSecondSlotWithEscape?.({
        isShowingSecondSlot: showSecondSlot,
        setSecondSlot: setShowSecondSlot,
      });
      onLeaveHandler();
    }, [onLeaveSecondSlotWithEscape, onLeaveHandler]);

    const onLeaveSecondSlotWithClickHandler = useCallback(() => {
      if (!secondSlot || !onLeaveSecondSlotWithClick) return;
      onLeaveSecondSlotWithClick?.({
        isShowingSecondSlot: showSecondSlot,
        setSecondSlot: setShowSecondSlot,
      });
      onLeaveHandler();
    }, [onLeaveSecondSlotWithClick, onLeaveHandler]);

    const onLeaveSecondSlotWithDoubleClickHandler = useCallback(() => {
      if (!secondSlot) return;
      onLeaveSecondSlotWithDoubleClick?.({
        isShowingSecondSlot: showSecondSlot,
        setSecondSlot: setShowSecondSlot,
      });
      onLeaveHandler();
    }, [onLeaveSecondSlotWithDoubleClick, onLeaveHandler]);

    useOnPressEscape({
      ref,
      handler: onLeaveSecondSlotWithEscapeHandler,
      isActive: !!showSecondSlot,
    });

    useOutsideClick({
      ref,
      handler: onLeaveSecondSlotWithClickHandler,
      isActive: !!showSecondSlot,
    });

    useOutsideDoubleClick({
      ref,
      handler: onLeaveSecondSlotWithDoubleClickHandler,
      isActive: !!showSecondSlot,
    });

    return (
      <td
        className={getClasses()}
        {...props}
        ref={setComponentRefs(ref, forwardRef)}
        onDoubleClick={showSecondSlotHandler}
      >
        {!showSecondSlot ? children : null}
        {secondSlot && showSecondSlot
          ? secondSlot({
              isShowingSecondSlot: showSecondSlot,
              setSecondSlot: setShowSecondSlot,
            })
          : null}
      </td>
    );
  }
);

TableData.displayName = "TableData";
