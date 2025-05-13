import { FC, useEffect, useRef } from "react";
import "./styles.css";
import gsap from "gsap";

export const CustomCursor: FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && pointRef.current) {
        if (isFirstRender.current) {
          cursorRef.current?.classList.remove("hidden");
          pointRef.current?.classList.remove("hidden");
        }

        const x = e.clientX;
        const y = e.clientY;

        gsap.quickTo(pointRef.current, "x", {
          duration: 0.15,
        })(x);
        gsap.quickTo(pointRef.current, "y", {
          duration: 0.15,
        })(y);

        gsap.quickTo(cursorRef.current, "x", {
          duration: 0.15,
        })(x);
        gsap.quickTo(cursorRef.current, "y", {
          duration: 0.15,
        })(y);
      }
    };

    const handleMouseDown = () => {
      cursorRef.current?.classList.add("click");
      pointRef.current?.classList.add("click");
      shadowRef.current?.classList.add("active");
    };

    const handleMouseUp = () => {
      setTimeout(() => {
        cursorRef.current?.classList.remove("click");
        pointRef.current?.classList.remove("click");
        shadowRef.current?.classList.remove("active");
      }, 200);
    };

    const hiddenOverCanvas = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.tagName === "CANVAS") {
          cursorRef.current?.classList.add("opacity-0");
          pointRef.current?.classList.add("opacity-0");
        } else {
          cursorRef.current?.classList.remove("opacity-0");
          pointRef.current?.classList.remove("opacity-0");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", hiddenOverCanvas);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", hiddenOverCanvas);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="commons-custom-cursor hidden">
        <div ref={shadowRef} className="commons-custom-cursor-shadow" />
      </div>
      <div ref={pointRef} className="commons-custom-cursor-point hidden" />
    </>
  );
};
