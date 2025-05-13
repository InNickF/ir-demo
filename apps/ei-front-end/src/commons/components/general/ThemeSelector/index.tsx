import { useOutsideClick } from "@/commons/hooks/useOutsideClick";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip, useTheme } from "in-ui-react";
import { FC, useRef, useState } from "react";
import { ThemeRadioList } from "./components/ThemeRadioList";
import { usePositionThemeMenu } from "./hooks/usePositionThemeMenu";
import "./styles.css";

export const themeSelectorCSSPrefix = "ui-commons-theme-selector";

interface ThemeSelectorProps {
  className?: string;
}

export const ThemeSelector: FC<ThemeSelectorProps> = ({ className }) => {
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);
  const { theme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  usePositionThemeMenu({
    buttonRef,
    containerRef,
    selectorIsOpen,
  });

  useOutsideClick(buttonRef, () => {
    if (!selectorIsOpen) return;
    setSelectorIsOpen(false);
  });

  const getClasses = () => {
    const classes = [themeSelectorCSSPrefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const getButtonClasses = () => {
    const classes = [
      `${themeSelectorCSSPrefix}__button`,
      "navbar-button--size",
    ];
    return classes.join(" ");
  };

  const getContainerClasses = () => {
    const classes = [`${themeSelectorCSSPrefix}__container`];
    selectorIsOpen &&
      classes.push(`${themeSelectorCSSPrefix}__container--open`);
    return classes.join(" ");
  };

  return (
    <div>
      <div className={getClasses()}>
        <Tooltip content="Change Theme">
          <Button
            ref={buttonRef}
            className={getButtonClasses()}
            kind="ghost"
            onlyIcon
            icon={theme?.includes("dark") ? <MoonIcon /> : <SunIcon />}
            onClick={() => {
              setSelectorIsOpen((prev) => !prev);
            }}
          />
        </Tooltip>
        <div ref={containerRef} className={getContainerClasses()}>
          <ThemeRadioList />
        </div>
      </div>
    </div>
  );
};
