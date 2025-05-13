import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { FC, useEffect, useMemo, useState } from "react";
import { CompLandForm } from "./components/CompLandForm";
import { CompLeaseForm } from "./components/CompLeaseForm";
import { CompSaleForm } from "./components/CompSaleForm";
interface CompFormSelectorProps {
  compType: CompstackCompType;
  modalIsVisible: boolean;
  onSave: () => void;
  onClose?: () => void;
}

export const CompFormSelector: FC<CompFormSelectorProps> = ({
  onSave,
  onClose,
  compType,
  modalIsVisible = false,
}) => {
  const [isFullForm, setIsFullForm] = useState(false);

  useEffect(() => {
    setIsFullForm(false);
  }, [compType]);

  const formCommonProps = useMemo(
    () => ({
      onSave,
      onClose,
      modalIsVisible,
      isFullForm,
      onFullFormMode: () => setIsFullForm(true),
    }),
    [isFullForm, modalIsVisible, onClose, onSave]
  );

  const availableForms = useMemo(
    () => ({
      sale: <CompSaleForm {...formCommonProps} />,
      lease: <CompLeaseForm {...formCommonProps} />,
      land: <CompLandForm {...formCommonProps} />,
    }),
    [formCommonProps]
  );

  return <>{availableForms[compType]}</>;
};
