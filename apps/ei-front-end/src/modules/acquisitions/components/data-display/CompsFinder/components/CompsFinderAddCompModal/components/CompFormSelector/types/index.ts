export interface CommonCompFormProps {
  modalIsVisible: boolean;
  isFullForm?: boolean;
  onFullFormMode: () => void;
  onSave: () => void;
  onClose?: () => void;
}
