import { useRef } from "react";
import useLinesAnimation from "./hooks/useLinesAnimation";
import "./styles.css";

function Lines({ count = 70 }) {
  const container = useRef<HTMLElement>(null);
  useLinesAnimation({ container });

  const getResponsiveClass = (i: number) =>
    i > count / 2.5 ? "auth-lines-container__line--responsive" : "";

  return (
    <>
      <section ref={container} className="auth-lines-container">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`auth-lines-container__line ${getResponsiveClass(i)}`}
          />
        ))}
      </section>
    </>
  );
}

export default Lines;
