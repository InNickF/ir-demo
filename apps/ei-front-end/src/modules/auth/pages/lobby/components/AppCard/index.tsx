import {
  BloomGradientContainer,
  BloomGradientElement,
} from "@/commons/components/other/BloomGradient";
import { useBloomBackground } from "@/commons/components/other/BloomGradient/hooks/useBackgroundBloom";
import { TextLogo } from "@/commons/components/other/TextLogo";
import Link from "next/link";
import { FC, useEffect, useRef } from "react";
import "./styles.css";

export interface AppCardProps {
  logo?: JSX.Element;
  url: string;
  name:
    | "Acquisitions"
    | "Debt"
    | "Assets"
    | "Insight"
    | "Investor"
    | "Tools"
    | "Dispositions";
  //TODO: Move this to actual logo names type
}

export const AppCard: FC<AppCardProps> = ({ logo, url, name }) => {
  const containerRef = useRef(null);
  useBloomBackground({ containerRef }, []);

  useEffect(function handle3dMovement() {
    const containerCopy = containerRef.current;
    const handle3dMouseMovement = (e: MouseEvent) => {
      if (window.innerWidth > 1280) {
        const friction = 1 / 8.5;
        const followX =
          containerCopy.offsetWidth / 2 -
          (e.clientX - containerCopy.offsetLeft);
        const followY =
          containerCopy.offsetHeight / 2 -
          (e.clientY - containerCopy.offsetTop);
        let x = 0;
        let y = 0;
        x += (-followX - x) * friction;
        y += (followY - y) * friction;
        containerCopy.style.setProperty("--perspective-x", `${x}deg`);
        containerCopy.style.setProperty("--perspective-y", `${y}deg`);
      }
    };

    containerCopy.addEventListener("mousemove", handle3dMouseMovement);

    containerCopy.addEventListener("mouseleave", () => {
      containerCopy.style.setProperty("--perspective-x", `0deg`);
      containerCopy.style.setProperty("--perspective-y", `0deg`);
    });

    return () => {
      containerCopy.removeEventListener("mousemove", handle3dMouseMovement);
      containerCopy.removeEventListener("mouseleave", () =>
        containerCopy.style.setProperty("--perspective-x", `0deg`)
      );
    };
  }, []);

  return (
    <Link href={url || "/"}>
      <a className="lobby-app-card__logo-container-button" ref={containerRef}>
        <div className="lobby-app-card__container">
          <BloomGradientContainer>
            <div className="lobby-app-card__logo-text-container">
              {logo ? (
                <div className="lobby-app-card__logo-container">{logo}</div>
              ) : null}
              <div className="lobby-app-card__name-container">
                <TextLogo name={name} className="text-3xl" />
              </div>
            </div>
            <BloomGradientElement />
          </BloomGradientContainer>
        </div>
      </a>
    </Link>
  );
};
