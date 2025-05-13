import { forwardRef, PropsWithChildren } from "react";
import "./styles.css";

export const BloomGradientElement = forwardRef(() => {
  return (
    <div
      className="commons-bloom-effect-element"
      style={{
        background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.3),transparent 40%)`,
      }}
    ></div>
  );
});

BloomGradientElement.displayName = "BloomGradientElement";

export const BloomGradientContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      data-bloom-bg
      className="h-full flex w-full flex-1 flex-col"
      style={
        {
          "--contrast": "0.15",
        } as React.CSSProperties
      }
    >
      {children}
      <BloomGradientElement />
    </div>
  );
});

BloomGradientContainer.displayName = "BloomGradientContainer";
