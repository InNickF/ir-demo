import { RefObject, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
): void => {
  useEffect(() => {
    // If you are using this hook and also using an onClick event you need to call "event.stopPropagation()" in your handler click function.
    const listener = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};
