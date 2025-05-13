import { Heading, HeadingKind } from "in-ui-react";
import { FC, HTMLAttributes } from "react";
import "./styles.css";

export const ComingSoon: FC<
  HTMLAttributes<HTMLDivElement> & { kind?: HeadingKind["kind"] }
> = ({ className, children, kind = "h6", ...props }) => {
  const getClasses = () => {
    const classes = ["ei-coming-soon-wrapper"];
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()} {...props}>
      <Heading kind={kind}>{children || "Coming soon"}</Heading>
    </div>
  );
};
