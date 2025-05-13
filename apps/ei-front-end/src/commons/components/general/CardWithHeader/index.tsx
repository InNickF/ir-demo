import { Loader3D, Loader3DProps } from "@/commons/components/3d/Loader3D";
import { ComingSoon } from "@/commons/components/feedback/ComingSoon";
import {
  BloomGradientContainer,
  BloomGradientElement,
} from "@/commons/components/other/BloomGradient";
import { useBloomBackground } from "@/commons/components/other/BloomGradient/hooks/useBackgroundBloom";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import {
  Card,
  CardProps,
  Empty,
  LoadingLine,
  Skeleton,
  TitleWithIcon,
  TitleWithIconProps,
} from "in-ui-react";
import { FC, PropsWithChildren, useRef, useState } from "react";
import "./styles.css";

export interface CardWithHeaderProps extends CardProps, PropsWithChildren {
  title: string;
  icon: TitleWithIconProps["icon"];
  headerActions?: JSX.Element;
  isLoading?: boolean;
  isRefetching?: boolean;
  className?: string;
  bodyPadding?: boolean;
  skeletonHeight?: number;
  comingSoon?: boolean;
  hasDataToShow?: boolean;
  titleKind?: TitleWithIconProps["kind"];
  disableInputBGColor?: boolean;
  disableOverflow?: boolean;
  loaderKind?: Loader3DProps["kind"] | "skeleton";
}

export const CardWithHeader: FC<CardWithHeaderProps> = ({
  title,
  icon,
  headerActions,
  isLoading = false,
  isRefetching = false,
  padding = false,
  bodyPadding = true,
  className,
  children,
  skeletonHeight = 300,
  comingSoon = false,
  hasDataToShow = true,
  titleKind = "h5",
  disableInputBGColor = false,
  disableOverflow = false,
  loaderKind = "chart",
  ...props
}) => {
  const prefix = "ui-commons-card-with-header";
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    comingSoon && classes.push(`${prefix}--coming-soon`);
    !disableInputBGColor && classes.push(`${prefix}--input-bg-color`);
    !disableOverflow && classes.push(`${prefix}--overflow`);
    return classes.join(" ");
  };

  const getBodyClasses = () => {
    const classes = [`${prefix}__body`];
    bodyPadding && classes.push(`${prefix}__body--padding`);
    return classes.join(" ");
  };

  const cardRef = useRef<HTMLDivElement>(null);

  useBloomBackground({ containerRef: cardRef, contrast: "soft" }, []);

  return (
    <Card {...props} className={getClasses()} padding={padding} ref={cardRef}>
      <BloomGradientContainer>
        <div className={`${prefix}__header-container`}>
          <LoadingLine persist isActive={isRefetching || isLoading} />
          <div className={`${prefix}__title`}>
            <TitleWithIcon icon={icon} kind={titleKind}>
              {convertToTitleCase(title)}
            </TitleWithIcon>
            {headerActions ? (
              <div className={`${prefix}__actions`}>{headerActions}</div>
            ) : null}
          </div>
        </div>
        <div className={getBodyClasses()}>
          <IsLoadingRenderWrapper
            isLoading={isLoading}
            prefix={prefix}
            skeletonHeight={skeletonHeight}
            loaderKind={loaderKind}
          >
            <HasDataRenderWrapper hasDataToShow={hasDataToShow}>
              {children}
            </HasDataRenderWrapper>
          </IsLoadingRenderWrapper>
        </div>
        {comingSoon ? <ComingSoon /> : null}
        <BloomGradientElement />
      </BloomGradientContainer>
    </Card>
  );
};

const HasDataRenderWrapper = ({
  hasDataToShow,
  children,
}: Pick<CardWithHeaderProps, "hasDataToShow" | "children">) => {
  return hasDataToShow ? <>{children}</> : <Empty />;
};

const IsLoadingRenderWrapper = ({
  isLoading,
  children,
  skeletonHeight,
  prefix,
  loaderKind,
}: { prefix: string } & Pick<
  CardWithHeaderProps,
  "isLoading" | "children" | "skeletonHeight" | "loaderKind"
>) => {
  const [localIsLoading, setLocalIsLoading] = useState(isLoading);

  const SkeletonWrapper = () => (
    <Skeleton
      className={`${prefix}__skeleton`}
      style={{
        minHeight: skeletonHeight,
      }}
    >
      <Skeleton.Avatar
        className={`${prefix}__skeleton`}
        shape="squared"
        style={{
          minHeight: skeletonHeight,
        }}
      />
    </Skeleton>
  );

  /**
   * Legacy Loader Animation behavior
   */
  if (loaderKind === "skeleton" && isLoading) {
    return <SkeletonWrapper />;
  }
  if (loaderKind === "skeleton" && !isLoading) {
    return <div className="generic-entrance-animation h-full">{children}</div>;
  }
  /**
   * END Legacy Loader Animation behavior
   */

  return isLoading || localIsLoading ? (
    <>
      <Loader3D
        kind={loaderKind as Loader3DProps["kind"]}
        className={`${prefix}__skeleton`}
        style={{
          minHeight: skeletonHeight,
        }}
        isLoading={isLoading}
        localIsLoading={localIsLoading}
        onChangeIsLoading={() => setLocalIsLoading(false)}
      />
    </>
  ) : (
    <div className="generic-entrance-animation h-full">{children}</div>
  );
};
