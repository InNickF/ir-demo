import { useGetPropertyComments } from "@/modules/assets/services/queries/properties";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { FC } from "react";
import { HTMLRendererCard } from "@/commons/components/general/HTMLRendererCard";

interface AssetPropertyCommentsProps {
  propertyId: string;
  className?: string;
}

export const AssetPropertyComments: FC<AssetPropertyCommentsProps> = ({
  propertyId,
  className,
}) => {
  const prefix = "asset-property-strategy";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const { data, isLoading, isRefetching } = useGetPropertyComments({
    filters: {
      property_under_management_code: propertyId,
    },
  });

  return (
    <HTMLRendererCard
      className={getClasses()}
      title="Property Comments"
      skeletonHeight={400}
      icon={<ChatBubbleLeftEllipsisIcon />}
      content={data?.comment}
      isLoading={isLoading}
      isRefetching={isRefetching}
    />
  );
};
