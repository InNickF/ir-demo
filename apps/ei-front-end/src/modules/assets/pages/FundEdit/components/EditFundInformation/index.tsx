import { useIdFromQueryParams } from "@/commons/hooks/useIdFromQueryParams";
import { getFundsURL } from "@/modules/assets/utils/redirects/funds-redirects";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FundWYSIWYG } from "./components/FundWYSIWYG";
import {
  useGetFundStrategy,
  useGetFundComments,
} from "@/modules/assets/services/queries/funds";
import {
  useMutatePostFundComments,
  useMutatePostFundStrategy,
} from "@/modules/assets/services/mutations/funds";
import { assetStrategyTypes } from "@/modules/assets/utils";
import { useAtom } from "jotai";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";

interface EditFundInformationProps {
  className?: string;
}

export const EditFundInformation: FC<EditFundInformationProps> = ({
  className,
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);

  const fundId = useIdFromQueryParams({
    model: "Fund",
    redirectOnNotFound: true,
    redirectURL: getFundsURL({
      id: null,
    }).rootURL,
  });

  const router = useRouter();

  const { data: fundStrategy } = useGetFundStrategy({
    filters: {
      fund_name: fundId,
      latest: "true",
    },
  });

  const { data: fundComments } = useGetFundComments({
    filters: {
      fund_name: fundId,
    },
  });

  const [strategies, setStrategies] = useState(
    assetStrategyTypes.map((type) => {
      return {
        note: "",
        type,
      };
    })
  );

  const [comments, setComments] = useState(fundComments?.comment || "");

  const strategyPostMutation = useMutatePostFundStrategy();
  const commentsPostMutation = useMutatePostFundComments();

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const redirectToFundOverview = () => {
    router.push(`/assets/portfolio/details/?id=${fundId}`);
  };

  const isMutating =
    strategyPostMutation?.isLoading || commentsPostMutation?.isLoading;

  const onSubmit = async () => {
    try {
      await commentsPostMutation.mutateAsync({
        fund_name: fundId,
        comment: comments,
      });

      await Promise.all(
        strategies.map((strategy) =>
          strategyPostMutation.mutateAsync({
            fund_name: fundId,
            note: strategy.note,
            type: strategy.type,
          })
        )
      );

      createNotification({
        subject: `Fund Strategies saved successfully.`,
        message: `All strategies have been applied to "${fundId}"`,
        kind: "success",
      });

      redirectToFundOverview();
    } catch (error) {
      console.error("Error saving fund information:", error);
    }
  };

  return (
    <div className={getClasses()}>
      <div>
        {strategies.map((strategy, index) => {
          const availableStrategy = fundStrategy?.results?.find(
            (fundStrategy) => fundStrategy?.type === strategy?.type
          )?.note;

          return (
            <FundWYSIWYG
              key={index}
              content={availableStrategy || ""}
              label={`${strategy.type} Strategy`}
              className="mb-8"
              onContentChange={(note) => {
                const newStrategy = [...strategies];
                newStrategy[index].note = note;
                setStrategies(newStrategy);
              }}
            />
          );
        })}
        <FundWYSIWYG
          label="Comments"
          content={fundComments?.comment}
          onContentChange={(comments) => setComments(comments)}
        />
      </div>
      <div className="flex justify-end mt-10">
        <Button kind="ghost" onClick={redirectToFundOverview}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled loading={isMutating}>
          Save
        </Button>
      </div>
    </div>
  );
};
