import { useDebouncedFunction } from "@/commons/hooks/useDebouncedFunction";
import { RefObject, useEffect, useRef } from "react";

export interface UseAutoResizeMapProps {
  containerRef: RefObject<HTMLDivElement>;
  /**
   * A function wrapped in a debounce that will be called when the container is resized
   * */
  onResize: (entry: ResizeObserverEntry) => void;
}

export const useAutoResizeMap: (props: UseAutoResizeMapProps) => void = ({
  containerRef,
  onResize = () => {
    return;
  },
}) => {
  const debouncedOnResize = useDebouncedFunction({
    delay: 150,
    func: onResize,
  });

  const observer = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      for (const entry of entries) {
        debouncedOnResize(entry);
      }
    })
  );

  useEffect(() => {
    observer.current.observe(containerRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.current.disconnect();
    };
  }, [containerRef]);
};
