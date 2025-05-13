import {
  usePropertyEGeneralLedger,
  usePropertyExecutedRules,
} from "@/modules/tools/services/queries/property-level-validations";
import { Title } from "in-ui-react";
import router from "next/router";
import { FC, PropsWithChildren } from "react";
import { PropertyExecutedRules } from "../../../../../../../../../PropertyExecutedRules";
import { PropertyGeneralLedger } from "../../../../../../../../../PropertyGeneralLedger";
import { ValidationRulesExportButton } from "../../../../../../../../../ValidationRulesExportButton";
import "./styles.css";
import { PropertyFinancialOverviewCard } from "@/modules/tools/pages/PropertyLevelValidations/components/PropertyFinancialOverviewCard";

const prefix = "plv-property-validation-item__details";

interface PropertyValidationItemDetailsProps {
  propertyId: string;
  isOpen: boolean;
  wasOpened: boolean;
  className?: string;
}
export const PropertyValidationItemDetails: FC<
  PropertyValidationItemDetailsProps
> = ({ className, isOpen, propertyId, wasOpened }) => {
  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    isOpen && classes.push(`${prefix}--open`);
    return classes.join(" ");
  };

  const { data: executedRules, isLoading: isLoadingExecutedRules } =
    usePropertyExecutedRules({
      filters: {
        property_code: propertyId,
        month: "3",
        year: "2024",
      },
      enabled: wasOpened,
    });

  const { data: generalLedger, isLoading: isLoadingGeneralLedger } =
    usePropertyEGeneralLedger({
      filters: {
        property_code: propertyId,
        month: "3",
        year: "2024",
      },
      enabled: wasOpened,
    });

  // const {
  //   data: operationalStatement,
  //   isLoading: isLoadingOperationalStatement,
  // } = useGetOperationalStatement({
  //   filters: {
  //     yardi_property_code: propertyId,
  //   },
  //   enabled: wasOpened,
  // });

  return (
    <section className={getClasses()}>
      <DetailsWrapperContainer>
        <div className={`${prefix}__header`}>
          <Title kind="h3" className={`${prefix}__header__title`}>
            Details
          </Title>
          <ValidationRulesExportButton
            type="property"
            propertyCode={propertyId}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PropertyExecutedRules
            data={executedRules}
            isLoading={isLoadingExecutedRules}
          />
          <PropertyGeneralLedger
            data={generalLedger?.results}
            isLoading={isLoadingGeneralLedger}
          />
        </div>
        <PropertyFinancialOverviewCard />
        {/* <PropertyOperationalStatement
          metrics={operationalStatement}
          isLoading={isLoadingOperationalStatement}
        /> */}
      </DetailsWrapperContainer>
    </section>
  );
};

/**
 * This component help to make the grid expand/collapse animation trick
 */
const DetailsWrapperContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-0">
      <div className="grid gap-4 p-3 grid-col-1">{children}</div>
    </div>
  );
};
