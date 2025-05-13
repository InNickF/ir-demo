import { useCallback, useEffect, useRef } from "react";

interface UseDebouncedFunctionProps<
  T extends (...args: Parameters<T>) => void
> {
  func: T;
  delay: number;
}
export const useDebouncedFunction = <
  T extends (...args: Parameters<T>) => void
>({
  func,
  delay,
}: UseDebouncedFunctionProps<T>): T => {
  const funcRef = useRef<T>(func);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update the latest function
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debouncedFunction as T;
};
