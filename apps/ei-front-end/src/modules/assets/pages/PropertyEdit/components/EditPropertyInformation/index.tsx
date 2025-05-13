import {
  useMutatePostPropertyComments,
  useMutatePostPropertyStrategy,
} from "@/modules/assets/services/mutations/properties";
import { FC, useState } from "react";
import { Button } from "in-ui-react";
import { useRouter } from "next/router";
import { usePropertyIdFromQueryParams } from "@/modules/assets/hooks/usePropertyIdFromQueryParams";
import { PropertyWYSIWYG } from "./components/PropertyWYSIWYG";
import {
  useGetPropertyComments,
  useGetPropertyStrategy,
} from "@/modules/assets/services/queries/properties";
import { assetStrategyTypes } from "@/modules/assets/utils";
import { useAtom } from "jotai";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";

interface EditPropertyInformationProps {
  className?: string;
}

export const EditPropertyInformation: FC<EditPropertyInformationProps> = ({
  className,
}) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const router = useRouter();
  const propertyId = usePropertyIdFromQueryParams();

  const { data: propertyStrategy } = useGetPropertyStrategy({
    filters: {
      property_under_management_code: propertyId,
    },
  });

  const { data: propertyComments } = useGetPropertyComments({
    filters: {
      property_under_management_code: propertyId,
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

  const [comments, setComments] = useState(propertyComments?.comment || "");

  const strategyPostMutation = useMutatePostPropertyStrategy();
  const commentsPostMutation = useMutatePostPropertyComments();

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  const redirectToPropertyOverview = () => {
    router.push(
      `/assets/properties/property-details/?propertyId=${propertyId}`
    );
  };

  const isMutating =
    strategyPostMutation?.isLoading || commentsPostMutation?.isLoading;

  const onSubmit = async () => {
    try {
      await commentsPostMutation.mutateAsync({
        property_under_management_code: propertyId,
        comment: comments,
      });

      await Promise.all(
        strategies.map((strategy) =>
          strategyPostMutation.mutateAsync({
            property_under_management_code: propertyId,
            note: strategy.note,
            type: strategy.type,
          })
        )
      );

      createNotification({
        subject: `Fund Strategies saved successfully.`,
        message: `All strategies have been applied to "${propertyId}"`,
        kind: "success",
      });

      redirectToPropertyOverview();
    } catch (error) {
      console.error("Error saving property information:", error);
    }
  };

  return (
    <div className={getClasses()}>
      <div>
        {strategies.map((strategy, index) => {
          const availableStrategy = propertyStrategy?.results?.find(
            (propertyStrategy) => propertyStrategy?.type === strategy?.type
          )?.note;

          return (
            <PropertyWYSIWYG
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
        <PropertyWYSIWYG
          label="Comments"
          content={propertyComments?.comment}
          onContentChange={(comments) => setComments(comments)}
        />
      </div>
      <div className="flex justify-end mt-10">
        <Button kind="ghost" onClick={redirectToPropertyOverview}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled loading={isMutating}>
          Save
        </Button>
      </div>
    </div>
  );
};
