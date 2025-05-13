import { IsLoadingProp, IsRefetchingProp } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { CardProps, TitleWithIconProps } from "in-ui-react";
import { FC } from "react";
import "./styles.css";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";

interface DealRoomCardProps extends CardProps, IsLoadingProp, IsRefetchingProp {
  title: string;
  icon: TitleWithIconProps["icon"];
}

export const DealRoomCard: FC<DealRoomCardProps> = ({
  title,
  isLoading = false,
  isRefetching = false,
  icon,
  children,
  ...props
}) => {
  return (
    <CardWithHeader
      title={convertToTitleCase(title)}
      icon={icon}
      bodyPadding={false}
      isRefetching={isRefetching}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </CardWithHeader>
  );
};
