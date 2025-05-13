/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsElement, PolymorphicComponentPropWithRef } from "../../utils/types";

export type LinkProps<C extends AsElement> = PolymorphicComponentPropWithRef<
  C,
  {
    /**
     * Default: null |
     * You can use this props to send a string with you custom css classes.
     */
    className?: string;
  }
>;
