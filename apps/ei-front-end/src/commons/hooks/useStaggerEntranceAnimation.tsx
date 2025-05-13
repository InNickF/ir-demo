import { MutableRefObject } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { useGsapContext } from "./useGsapContext";
import gsap from "gsap";

interface UseStaggerEntranceAnimationProps {
  container: MutableRefObject<HTMLElement>;
  querySelector?: string;
}

export const useStaggerEntranceAnimation = ({
  container,
  querySelector = ".stagger-entrance-animation",
}: UseStaggerEntranceAnimationProps) => {
  const context = useGsapContext(container);

  useIsomorphicLayoutEffect(() => {
    const q = gsap.utils.selector(container);
    context.add(() => {
      gsap.fromTo(
        [q(querySelector)],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.2,
          ease: "Power2.inOut",
        }
      );
    });

    return () => {
      context.revert();
    };
  }, []);
};
