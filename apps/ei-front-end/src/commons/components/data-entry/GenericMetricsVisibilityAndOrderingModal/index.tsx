import { HeaderFormatter } from "@/commons/model-in/formatters/types";
import { ModelSchema } from "@/commons/model-in/types";
import { Button, Modal } from "in-ui-react";
import { z } from "zod";
import { MetricsDnDContainer } from "./components/MetricsDnDContainer";
import { GenericMetricsVisibilityAndOrderingDndContext } from "./context/GenericMetricsVisibilityAndOrderingDndContext";
import { GenericMetricsVisibilityAndOrderingStateProvider } from "./context/GenericMetricsVisibilityAndOrderingSharedState";
import { GenericMetricsVisibilityAndOrderingSortableDndContext } from "./context/GenericMetricsVisibilityAndOrderingSortableDndContext";

export type ValidMetricsRecord = Record<string, boolean>;
export interface GenericMetricsVisibilityAndOrderingSharedState<
  T extends ValidMetricsRecord = ValidMetricsRecord
> {
  dndId: string;
  visibilityState: T;
  orderState: Array<keyof T>;
  uiHiddenKeys?: Array<keyof T>;
  modelHeaderFormatter?: HeaderFormatter<z.infer<ModelSchema>>;
  onChangeVisibility: (newVisibility: T) => void;
  onChangeOrder: (newOrder: Array<keyof T>) => void;
  onResetMetrics?: () => void;
}
export interface GenericMetricsVisibilityAndOrderingModalProps<
  T extends ValidMetricsRecord
> extends GenericMetricsVisibilityAndOrderingSharedState<T> {
  headerText?: string;
  buttonText?: string;
}
export const GenericMetricsVisibilityAndOrderingModal = <
  T extends ValidMetricsRecord
>({
  headerText = "Metrics",
  buttonText = "Choose Metrics",
  ...props
}: GenericMetricsVisibilityAndOrderingModalProps<T>) => {
  return (
    <Modal
      disclosure={<Button kind="outline">{buttonText}</Button>}
      // workaround to prevent focus trap
      options={{ modal: false, animated: true }}
    >
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            {headerText}
          </Modal.Header>
          <GenericMetricsVisibilityAndOrderingStateProvider
            defaultValue={props}
          >
            <GenericMetricsVisibilityAndOrderingDndContext>
              <GenericMetricsVisibilityAndOrderingSortableDndContext>
                <MetricsDnDContainer />
              </GenericMetricsVisibilityAndOrderingSortableDndContext>
            </GenericMetricsVisibilityAndOrderingDndContext>
          </GenericMetricsVisibilityAndOrderingStateProvider>
        </>
      )}
    </Modal>
  );
};
