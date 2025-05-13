import { forwardRef, FunctionComponent, Ref } from "react";
import { HeadingKind } from "./props";
import "./styles.css";

/**
 * In UI link Component
 * @see {@link https://todo.com/} for official documentation.
 * @param kind
 * Default: 'display' |
 * Specifies which heading kind to render.
 * @param className
 * Default: null |
 *  * You can use this prop to send a string with your custom css classes.
 * @param children |
 * The classic React children prop.
 * @param sans |
 * Default: 'false' |
 * Specifies if heading will be rendered with sans family.
 * @interface HeadingProps
 * This is the custom interface created for this component logic.
 * @interface HTMLAttributes
 * @returns
 * A inUI heading react component
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingKind>(
  ({ kind = "display", children, className, sans = false, ...props }, ref) => {
    const customElements: { [key: string]: string } = {
      "subtitle-1": "h5",
      "subtitle-2": "h6",
      display: "h1",
      "sub-display": "h2",
    };

    const renderElement = () => {
      return customElements[kind] || kind;
    };

    const Heading = renderElement() as unknown as FunctionComponent<
      Omit<HeadingKind, "size"> & { ref?: Ref<HTMLHeadElement> }
    >;

    const prefix = "in-ui-heading";

    const getClasses = (): string => {
      const classes: string[] = [`${prefix}`, `${prefix}--${kind}-kind`];
      sans && classes.push(`${prefix}--sans`);
      className && classes.push(className);

      return classes.join(" ");
    };

    return (
      <Heading ref={ref} {...props} className={getClasses()}>
        {children}
      </Heading>
    );
  }
);

Heading.displayName = "Heading";
