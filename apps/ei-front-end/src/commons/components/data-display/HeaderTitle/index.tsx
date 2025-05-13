import { IsLoadingProp } from "@/commons/typings";
import { Heading, Skeleton } from "in-ui-react";
import { FC, PropsWithChildren } from "react";

interface HeaderTitleProps extends PropsWithChildren, IsLoadingProp {
  small?: boolean;
}

export const HeaderTitle: FC<HeaderTitleProps> = ({
  isLoading = false,
  children,
  small = false,
}) => {
  const getClasses = () => {
    const classes = ["text-5xl"];
    !small && classes.push("lg:text-display mb-2");
    return classes.join(" ");
  };

  return (
    <>
      {isLoading ? (
        <Skeleton>
          <Skeleton.Text kind="title" className="h-20" />
        </Skeleton>
      ) : (
        <Heading kind="h1" className={getClasses()}>
          {children}
        </Heading>
      )}
    </>
  );
};
