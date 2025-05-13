import { useGsapContext } from "@/commons/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/commons/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import { MutableRefObject } from "react";

const opacityWithHeightAnimation = [
  [
    (line) =>
      gsap.to(line, {
        duration: 0.2,
        opacity: 1,
      }),
    (time) => time,
  ],
  [
    (line) =>
      gsap.fromTo(
        line,
        {
          height: "0%",
          top: "0%",
          ease: "Power2.ease",
        },
        {
          duration: 0.4,
          height: "100%",
          top: "0%",
          ease: "Power2.ease",
          immediateRender: false,
        }
      ),
    (time) => time,
  ],
  [
    (line) =>
      gsap.fromTo(
        line,
        {
          height: "100%",
          top: "0%",
          ease: "Power2.ease",
        },
        {
          duration: 0.42,
          height: "0%",
          top: "100%",
          ease: "Power2.ease",
          immediateRender: false,
        }
      ),
    (time) => time + 0.4,
  ],
  [
    (line) =>
      gsap.to(line, {
        duration: 0.2,
        opacity: 0,
      }),
    (time) => time + 0.82,
  ],
];

interface UseLinesAnimationProps {
  container: MutableRefObject<HTMLElement>;
  randomGapTime?: number;
}

const useLinesAnimation = ({
  container,
  randomGapTime = 5,
}: UseLinesAnimationProps) => {
  const context = useGsapContext(container);

  useIsomorphicLayoutEffect(() => {
    const q = gsap.utils.selector(container);
    const lines = q(".auth-lines-container__line");

    const ANIMATION_INDEX = 0;
    const ANIMATION_RENDER_TIME = 1;

    context.add(() => {
      const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.25,
      });
      lines.forEach((line, i) => {
        const time = Math.random() * randomGapTime;
        opacityWithHeightAnimation.forEach((animation) => {
          timeline.add(
            animation[ANIMATION_INDEX](line),
            animation[ANIMATION_RENDER_TIME](i === 36 ? 0 : time)
          );
        });
      });
    });

    return () => {
      context.revert();
    };
  }, []);
};

export default useLinesAnimation;
