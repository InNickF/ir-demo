import { FC, HTMLAttributes } from "react";
import "./styles.css";

export const SamplePrompt: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const getClasses = (): string => {
    const classes: string[] = ["insight-sample-prompt-button"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <button className={getClasses()} {...props}>
      {children}
    </button>
  );
};
