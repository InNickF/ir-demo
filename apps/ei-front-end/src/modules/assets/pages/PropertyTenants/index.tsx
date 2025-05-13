import { ARPropertyTable } from "@/assets/components/data-display/ARPropertyTable";
import { LeaseExpirationPortrait } from "@/assets/components/data-display/LeaseExpirationPortrait";
import { RentRoll } from "@/assets/components/data-display/RentRoll";
import { StackingPlan } from "@/assets/components/data-display/StackingPlan";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";

const PropertyTenants: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <StackingPlan
          className="col-auto lg:col-span-1"
          filters={{ yardi_property_code: propertyId }}
        />
        <LeaseExpirationPortrait
          className="col-auto lg:col-span-1"
          filters={{ yardi_property_code: propertyId }}
        />
      </div>
      <RentRoll filters={{ yardi_property_code: propertyId }} />
      <ARPropertyTable
        filters={{
          yardi_entity_code: propertyId,
        }}
      />
    </div>
  );
};

PropertyTenants.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Tenants" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyTenants;
