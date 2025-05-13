import { RefObject, useEffect } from "react";

export const useOutsideDoubleClick = <T extends HTMLElement = HTMLElement>({
  handler,
  ref,
  isActive,
}: {
  ref: RefObject<T>;
  handler: (event: MouseEvent) => void;
  isActive?: boolean;
}): void => {
  useEffect(() => {
    if (!isActive) return;
    // If you are using this hook and also using an onClick event you need to call "event.stopPropagation()" in your handler click function.
    const listener = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener("dblclick", listener);
    return () => {
      document.removeEventListener("dblclick", listener);
    };
  }, [ref, handler, isActive]);
};
