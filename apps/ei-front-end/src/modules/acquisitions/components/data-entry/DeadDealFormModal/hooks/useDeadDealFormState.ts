import { useCallback, useState } from "react";
import { DeadDealFormProps } from "../../DeadDealForm";

type DeadDealFormState = Pick<
  DeadDealFormProps,
  "dealId" | "defaultValues" | "redirectToDeal"
>;
export const useDeadDealFormState = () => {
  const [showDeadModal, setShowDeadModal] = useState(false);
  const [deadModalFormProps, setDeadModalFormProps] =
    useState<DeadDealFormState>(null);

  const showDeadDealFormModal = useCallback((props: DeadDealFormProps) => {
    setDeadModalFormProps(props);
    setShowDeadModal(true);
  }, []);

  const hideDeadDealFormModal = useCallback(
    (
      { callback }: { callback?: () => void } = {
        callback: () => null,
      }
    ) => {
      setShowDeadModal(false);
      callback?.();
      setTimeout(() => {
        setDeadModalFormProps(null);
      }, 500);
    },
    []
  );

  return {
    showDeadModal,
    deadModalFormProps,
    showDeadDealFormModal,
    hideDeadDealFormModal,
  };
};
