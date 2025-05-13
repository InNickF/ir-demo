import {
  propertiesTableColumnOrderAtom,
  propertiesTableColumnVisibilityAtom,
} from "@/assets/store/properties";
import { propertyFormatter } from "@/modules/assets/entities/asset/formatters";
import {
  getPropertiesTableInitialOrder,
  getPropertiesTableInitialVisibility,
  propertiesMetricsVisibilityAndOrderingUIHiddenKeys,
} from "@/assets/utils/properties";
import { GenericMetricsVisibilityAndOrderingModal } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal";
import { useAtom } from "jotai";

export const PropertiesMetricsVisibilityAndOrderingModal = () => {
  const [assetsTableOrder, setAssetsTableOrder] = useAtom(
    propertiesTableColumnOrderAtom
  );
  const [assetsTableVisibility, setAssetsTableVisibility] = useAtom(
    propertiesTableColumnVisibilityAtom
  );
  return (
    <GenericMetricsVisibilityAndOrderingModal
      dndId="assets-properties"
      visibilityState={assetsTableVisibility}
      orderState={assetsTableOrder}
      onChangeVisibility={(newValue) => setAssetsTableVisibility(newValue)}
      onChangeOrder={(newValue) => setAssetsTableOrder(newValue)}
      uiHiddenKeys={propertiesMetricsVisibilityAndOrderingUIHiddenKeys}
      modelHeaderFormatter={propertyFormatter.header}
      headerText="Property Metrics"
      onResetMetrics={() => {
        setAssetsTableOrder(getPropertiesTableInitialOrder());
        setAssetsTableVisibility(getPropertiesTableInitialVisibility());
      }}
    />
  );
};
