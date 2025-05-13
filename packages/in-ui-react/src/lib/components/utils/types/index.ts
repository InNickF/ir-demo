type above = "above";

export type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export type AboveColor =
  | `${above}-primary`
  | `${above}-secondary`
  | `${above}-tertiary`
  | `${above}-success`
  | `${above}-warning`
  | `${above}-error`;

export type Size = "small" | "normal" | "big";
export type ReactDangerousHTML = {
  __html: string;
};

export type Shadow = "0" | "1" | "2" | "3" | "4";

export type AsElement = React.ElementType | React.ComponentType;

export type AsProp<C extends AsElement> = {
  as?: C;
};

export type PropsToOmit<C extends AsElement, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends AsElement,
  Props
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentPropWithRef<
  C extends AsElement,
  Props
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

export type InputsColor = "default" | "over-ghost" | "glass";
