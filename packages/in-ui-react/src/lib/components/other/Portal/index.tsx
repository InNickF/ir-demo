import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./props";

export const Portal = ({ children, rootSelector }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const el = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setMounted(true);
    el.current = document.createElement("div");
    const portalRoot = rootSelector
      ? document.querySelector(rootSelector)
      : document.body;
    const current = el.current;

    portalRoot!.appendChild(current);
    return () => {
      setMounted(false);
      portalRoot!.removeChild(current);
    };
  }, []);

  return mounted ? createPortal(children, el.current) : null;
};
