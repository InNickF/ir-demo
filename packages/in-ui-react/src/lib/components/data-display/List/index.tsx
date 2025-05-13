import { forwardRef } from "react";
import { ListProps, ListComponentGroup } from "./props";
import { Body, Row, Data, Head, Header } from "./components";
import "./styles.css";

/**
 * In UI List Component
 * @see {@link https://todo.com/} for official documentation.
 * @param className
 * Default: null |
 * You can use this prop to send a string with your custom css classes.
 * @param children
 * The classic React children prop.
 * @param size
 * Default: 'normal' |
 * Specifies the tag size.
 * @interface ListProps
 * This is the custom interface created for this component logic.
 * @returns
 * A inUI List react component
 */
export const ListComponent = forwardRef<HTMLTableElement, ListProps>(
  ({ className, size = "normal", children, ...props }, ref) => {
    const prefix = "in-ui-list";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}--${size}-size`];
      className && classes.push(className);
      return classes.join(" ");
    };
    return (
      <>
        <table className={getClasses()} {...props} ref={ref}>
          {children}
        </table>
      </>
    );
  }
);

ListComponent.displayName = "ListComponent";

const List = ListComponent as ListComponentGroup;
List.Row = Row;
List.Data = Data;
List.Header = Header;
List.Body = Body;
List.Head = Head;

export default List;
