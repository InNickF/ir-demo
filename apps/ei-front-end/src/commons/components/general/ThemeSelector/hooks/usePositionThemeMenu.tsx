import { RefObject, useEffect, useRef } from "react";

export interface UsePositionThemeMenuProps {
  buttonRef: RefObject<HTMLButtonElement>;
  containerRef: RefObject<HTMLDivElement>;
  selectorIsOpen: boolean;
}

export const usePositionThemeMenu: (
  props: UsePositionThemeMenuProps
) => void = ({ buttonRef, containerRef, selectorIsOpen }) => {
  // Create the observer callback function to handle the intersection changes of the container
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const { current } = containerRef;
      const containerRect = current.getBoundingClientRect();
      const buttonRect = entry.boundingClientRect;

      // if the container is outside the window, move it inside

      if (containerRect.right > window.innerWidth) {
        current.style.right = "0px";
      }

      if (containerRect.left < 0) {
        current.style.left = "0px";
      }

      // Apply small margin to the right and left of the container if it's touching the window edge

      if (buttonRect.right >= window.innerWidth) {
        current.style.marginRight = "12px";
      }

      if (buttonRect.left <= 12) {
        current.style.marginLeft = "12px";
      }
    });
  };

  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(observerCallback)
  );

  useEffect(() => {
    observer.current.observe(buttonRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.current.disconnect();
    };
  }, [buttonRef, selectorIsOpen]);
};
