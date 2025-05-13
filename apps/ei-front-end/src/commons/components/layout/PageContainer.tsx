import { Container, ContainerProps } from "in-ui-react";
import { FC } from "react";

export const PageContainer: FC<
  ContainerProps & {
    entranceAnimation?: boolean;
  }
> = ({ children, className, entranceAnimation = true, ...props }) => {
  const getClasses = () => {
    const classes = ["pb-6", "pt-4"];
    entranceAnimation && classes.push("page-entrance");
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <Container {...props} className={getClasses()}>
      {children}
    </Container>
  );
};
