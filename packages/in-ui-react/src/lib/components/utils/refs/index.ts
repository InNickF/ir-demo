import { ForwardedRef, MutableRefObject, Ref } from "react";

/**
 * Creates a single function that will set the current value of a ref, as well as
 * call any other ref that is passed in.
 */
export const setComponentRefs =
  <T>(ref: Ref<T | null>, forwardedRef: ForwardedRef<T>) =>
  (el: T) => {
    if (ref) {
      if ("current" in ref) {
        (ref as MutableRefObject<T | null>).current = el;
      } else {
        (ref as (instance: T | null) => void)(el);
      }
    }
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef && "current" in forwardedRef)
      (forwardedRef as MutableRefObject<T | null>).current = el;
  };
