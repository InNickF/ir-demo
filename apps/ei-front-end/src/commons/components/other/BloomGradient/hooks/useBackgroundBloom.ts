import { useEffect } from "react";
interface UseBloomBackgroundParams {
  containerRef: React.RefObject<HTMLElement>;
  contrast?: "normal" | "soft";
}
type UseBloomBackground = (
  params: UseBloomBackgroundParams,
  deps: unknown[]
) => void;

export const useBloomBackground: UseBloomBackground = (
  { containerRef, contrast = "normal" },
  deps
) => {
  useEffect(
    function handleMouseEffect() {
      const refCopy = containerRef?.current;
      const contrastValues = {
        normal: 0.2,
        soft: 0.075,
      };
      const size = {
        normal: "800px",
        soft: "1200px",
      };
      const cards =
        document.querySelectorAll<HTMLDivElement>("[data-bloom-bg]");
      const handlePointerMove = (e: PointerEvent) => {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
          card.style.setProperty(
            "--contrast",
            contrastValues[contrast].toString()
          );
          card.style.setProperty("--size", size[contrast]);
        });
      };

      refCopy?.addEventListener("pointermove", handlePointerMove);

      return () => {
        refCopy?.removeEventListener("pointermove", handlePointerMove);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
