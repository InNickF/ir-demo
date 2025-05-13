import { MutableRefObject, useMemo } from "react";
import gsap from "gsap";

export const useGsapContext = (scope: MutableRefObject<HTMLElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const context = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return context;
};
