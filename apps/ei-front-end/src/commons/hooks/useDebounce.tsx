import { useEffect, useState } from "react";

export interface UseDebounceParams<T> {
  value: T;
  delay: number;
  enabled?: boolean;
  onFinish?: () => void;
}
export const useDebounce = <T,>({
  delay,
  value,
  enabled = true,
  onFinish,
}: UseDebounceParams<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (enabled) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        onFinish?.();
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay, onFinish, enabled]);

  return debouncedValue;
};
