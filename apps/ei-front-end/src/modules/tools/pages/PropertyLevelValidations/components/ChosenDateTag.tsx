import { useListValidationQueryParams } from "@/modules/tools/pages/PropertyLevelValidations/hooks/useListValidationQueryParams";
import { Tag } from "in-ui-react";
import { useRouter } from "next/router";

export const ChosenDateTag = () => {
  const router = useRouter();
  const queries = useListValidationQueryParams();
  const getClasses = () => {
    const classes = ["text-silver"];
    !queries?.month && !queries?.year && classes.push("hidden");
    return classes.join(" ");
  };

  const paddedMonth = (router?.query?.month as string)
    ? queries.month.padStart(2, "0")
    : "";

  return (
    <Tag
      className={getClasses()}
      text={`Chosen date: ${paddedMonth}/${router?.query?.year}`}
      size="small"
      textSliceLength={Infinity}
    />
  );
};
