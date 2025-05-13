import {
  Deal,
  ExtendedDealInformation,
} from "@/modules/acquisitions/typings/deals";
import { useQuickDealEditForm } from "../hooks/useQuickDealEditForm";

export interface QuickDealsFormProps {
  dealId: Deal["id"];
  deal?: Deal;
  defaultValues?: Partial<ExtendedDealInformation>;
  children: (props: ReturnType<typeof useQuickDealEditForm>) => JSX.Element;
  onCancel?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
}
