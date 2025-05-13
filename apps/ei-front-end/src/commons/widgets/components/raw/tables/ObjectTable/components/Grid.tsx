import { FC, PropsWithChildren } from "react";

interface GridProps extends PropsWithChildren {
  grow?: boolean;
}
export const Grid: FC<GridProps> = ({ children, grow }) => {
  const getClasses = (): string => {
    const classes = [];

    grow
      ? classes.push(["flex", "flex-wrap", "justify-between"])
      : classes.push([
          "grid",
          "sm:grid-cols-[repeat(auto-fill,minmax(theme(spacing.96),1fr))",
          "grid-cols-1",
        ]);

    return classes.join(" ");
  };
  return <ul className={getClasses()}>{children}</ul>;
};
