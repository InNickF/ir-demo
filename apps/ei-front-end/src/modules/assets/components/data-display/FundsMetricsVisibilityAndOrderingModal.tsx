import {
  fundsTableColumnOrderAtom,
  fundsTableColumnVisibilityAtom,
} from "@/assets/store/funds";
import {
  fundsVisibilityAndOrderingUIHiddenKeys,
  getFundsTableInitialOrder,
  getFundsTableInitialVisibility,
} from "@/assets/utils/funds";
import { GenericMetricsVisibilityAndOrderingModal } from "@/commons/components/data-entry/GenericMetricsVisibilityAndOrderingModal";
import { useAtom } from "jotai";

export const FundsMetricsVisibilityAndOrderingModal = () => {
  const [fundsTableOrder, setFundsTableOrder] = useAtom(
    fundsTableColumnOrderAtom
  );
  const [fundsTableVisibility, setFundsTableVisibility] = useAtom(
    fundsTableColumnVisibilityAtom
  );
  return (
    <GenericMetricsVisibilityAndOrderingModal
      dndId="assets-funds"
      visibilityState={fundsTableVisibility}
      orderState={fundsTableOrder}
      onChangeVisibility={(newValue) => setFundsTableVisibility(newValue)}
      onChangeOrder={(newValue) => setFundsTableOrder(newValue)}
      uiHiddenKeys={fundsVisibilityAndOrderingUIHiddenKeys}
      headerText="Funds Metrics"
      onResetMetrics={() => {
        setFundsTableOrder(getFundsTableInitialOrder());
        setFundsTableVisibility(getFundsTableInitialVisibility());
      }}
    />
  );
};
