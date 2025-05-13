import { PropertyStatusSummary } from "@/modules/tools/pages/PropertyLevelValidations/components/PropertyStatusSummary";
import { useSinglePropertyValidations } from "@/modules/tools/services/queries/property-level-validations";
import { useRouter } from "next/router";
import { FC } from "react";
import { PropertyValidationItemDetails } from "../ListValidationDashboard/components/ListValidationDashboardContent/components/ListValidationProperties/components/PropertyValidationItem/components/PropertyValidationItemDetails";
import { Button, Heading, Skeleton } from "in-ui-react";
import { ChosenDateTag } from "../ChosenDateTag";
import { DAGTriggerButton } from "../DAGTriggerButton";
import { LastUpdatedTag } from "../LastUpdatedTag";
import { transformInputDateToMMDDYYYY } from "@/commons/utils/dates";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface SinglePropertyValidationDashboardProps {
  className?: string;
}

export const SinglePropertyValidationDashboard: FC<
  SinglePropertyValidationDashboardProps
> = ({ className }) => {
  const router = useRouter();
  const propertyCode = router?.query?.property as string;

  const prefix = "plv-property-validation-item";

  const { data, isLoading } = useSinglePropertyValidations({
    filters: {
      property_code: propertyCode,
      month: "3",
      year: "2024",
    },
  });

  const propertyValidations = data?.results[0];

  const getClasses = () => {
    const classes = [prefix, "in-ui-animation--appears"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <>
      {!isLoading ? (
        <article className={getClasses()}>
          <section className={`${prefix}-header-container`}>
            <header className={`${prefix}__header`}>
              <Heading kind="h5" className="p-2 font-bold">
                {propertyValidations.property_name} ({propertyCode})
              </Heading>
              <div className="flex gap-2">
                <ChosenDateTag />
                <LastUpdatedTag
                  lastUpdated={
                    transformInputDateToMMDDYYYY(
                      propertyValidations?.last_updated
                    ) || "N/A"
                  }
                />
              </div>
            </header>
            <aside className={`${prefix}__aside`}>
              <PropertyStatusSummary
                failed={propertyValidations?.failed}
                succeeded={propertyValidations?.succeeded}
              />
              <Button
                icon={<ChevronLeftIcon />}
                onClick={() => {
                  router.push("/tools/");
                }}
                loading={isLoading}
                kind="ghost"
              >
                Go back
              </Button>
            </aside>
          </section>
          <PropertyValidationItemDetails
            propertyId={propertyCode}
            isOpen={true}
            wasOpened={true}
          />
        </article>
      ) : (
        <Skeleton className="block">
          <Skeleton.Avatar shape="squared" className="w-full h-[600px]" />
        </Skeleton>
      )}
    </>
  );
};
