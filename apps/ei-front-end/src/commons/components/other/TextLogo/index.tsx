import { LogoProps } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

type TextLogoNames = "Investor" | "Tools" | "Insight" | "Dispositions" | "Lab";

interface TextLogoProps {
  name: Omit<LogoProps["name"], "Sight"> | TextLogoNames;
  className?: string;
  opacity?: "semi-transparent" | "solid";
}

export const TextLogo: FC<TextLogoProps> = ({
  name,
  className,
  opacity = "solid",
}) => {
  const prefix = "ui-commons-text-logo";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const getSuffixClasses = () => {
    const classes = [`${prefix}__suffix`];
    opacity === "semi-transparent"
      ? classes.push(`${prefix}__suffix-semi-transparent`)
      : classes.push(`${prefix}__suffix-solid`);
    return classes.join(" ");
  };

  return (
    <p className={getClasses()}>
      {/*       <span className={`${prefix}__prefix`}>in</span> */}
      <span className={getSuffixClasses()}>{name}</span>
    </p>
  );
};
