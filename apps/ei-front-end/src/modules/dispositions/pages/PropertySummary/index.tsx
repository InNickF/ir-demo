import { LeaseExpirationPortrait } from "@/assets/components/data-display/LeaseExpirationPortrait";
import { AssetPropertyImageMap } from "@/assets/components/data-display/PropertyImageMap";
import { PropertyInformation } from "@/dispositions/components/data-display/PropertyInformation";
import { RentRoll } from "@/assets/components/data-display/RentRoll";
import { StackingPlan } from "@/assets/components/data-display/StackingPlan";
import { usePropertySummaryFilters } from "@/assets/services/queries/filters";
import { NextPageWithLayout } from "@/commons/typings";
import { Filters, useFilters } from "in-ui-react";
import { ReactElement } from "react";
import { PropertyDebtMetrics } from "./components/PropertyDebtMetrics";

import { DispositionsHead } from "../../components/general/DispositionsHead";
import { DispositionsOverviewLayout } from "../../layouts/DispositionsLayout";
import { InDispositionsPermissionsLayout } from "../../layouts/InDispositionsPermissionsLayout";
import { PropertyMetrics } from "./components/PropertyMetrics";
import "./styles.css";

const PropertyAsset: NextPageWithLayout = () => {
  const { filteredOptions, onApply } = useFilters({
    properties: "1230-llc",
  });

  const { data: assetProperty, isLoading: isAssetPropertyLoading } =
    usePropertySummaryFilters();

  const selectedProperty = filteredOptions?.properties.toString();

  return (
    <div className="dispositions-investor-page__grid">
      <div className="dispositions-investor-page__grid-full">
        <Filters
          filters={assetProperty || []}
          filteredOptions={filteredOptions}
          onApply={(filters) => onApply(filters)}
          kind="glass"
          isLoading={isAssetPropertyLoading}
          autoInitialFocus={false}
        />
      </div>
      <PropertyInformation
        twoColumn={true}
        propertyId={selectedProperty}
        className="dispositions-investor-page__grid-full"
      />
      <AssetPropertyImageMap
        propertyId={selectedProperty}
        className="dispositions-investor-page__grid-half"
      />
      <PropertyMetrics
        propertyId={selectedProperty}
        className="dispositions-investor-page__grid-half"
      />
      <StackingPlan
        filters={{ yardi_property_code: selectedProperty }}
        className="dispositions-investor-page__grid-half"
      />
      <LeaseExpirationPortrait
        filters={{ yardi_property_code: selectedProperty }}
        className="dispositions-investor-page__grid-half"
      />
      <PropertyDebtMetrics
        propertyId={selectedProperty}
        className="dispositions-investor-page__grid-full"
      />
      <RentRoll
        filters={{ yardi_property_code: selectedProperty }}
        className="dispositions-investor-page__grid-full"
      />
    </div>
  );
};

PropertyAsset.getLayout = (page: ReactElement) => {
  return (
    <InDispositionsPermissionsLayout>
      <DispositionsHead title="Property" />
      <DispositionsOverviewLayout title="Property">
        {page}
      </DispositionsOverviewLayout>
    </InDispositionsPermissionsLayout>
  );
};

export default PropertyAsset;
