import { RefObject, useEffect } from "react";

export const useOnPressEscape = <T extends HTMLElement = HTMLElement>({
  handler,
  ref,
  isActive,
}: {
  ref: RefObject<T>;
  handler: (event: KeyboardEvent) => void;
  isActive?: boolean;
}): void => {
  useEffect(() => {
    if (!isActive) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [ref, handler, isActive]);
};
