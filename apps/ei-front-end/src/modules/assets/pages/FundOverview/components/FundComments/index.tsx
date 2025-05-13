import { HTMLRendererCard } from "@/commons/components/general/HTMLRendererCard";
import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { useGetFundComments } from "@/modules/assets/services/queries/funds";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

interface FundCommentsProps {
  className?: string;
}

export const FundComments: FC<FundCommentsProps> = ({ className }) => {
  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const { data, isLoading, isRefetching } = useGetFundComments({
    filters: {
      fund_name: fundId,
    },
  });

  return (
    <HTMLRendererCard
      className={className}
      title="Comments"
      icon={<ChatBubbleLeftEllipsisIcon />}
      skeletonHeight={400}
      content={data?.comment}
      isLoading={isLoading}
      isRefetching={isRefetching}
    />
  );
};
