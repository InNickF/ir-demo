import { PropertyDebtMetrics } from "@/assets/components/data-display/PropertyDebtMetrics";
import { AssetHead } from "@/assets/components/general/AssetHead";
import { usePropertyIdFromQueryParams } from "@/assets/hooks/usePropertyIdFromQueryParams";
import { AssetLayout } from "@/assets/layouts/AssetLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";

const PropertyDebt: NextPageWithLayout = () => {
  const propertyId = usePropertyIdFromQueryParams();

  return (
    <div className="grid grid-cols-1 gap-3">
      <PropertyDebtMetrics propertyId={propertyId} />
    </div>
  );
};

PropertyDebt.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Property - Debt" />
      <AssetLayout>{page}</AssetLayout>
    </InAssetsPermissionsLayout>
  );
};

export default PropertyDebt;
