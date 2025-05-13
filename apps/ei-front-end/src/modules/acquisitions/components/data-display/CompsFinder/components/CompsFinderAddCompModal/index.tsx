import { CompstackCompType } from "@/modules/acquisitions/typings/market-analytics";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "in-ui-react";
import { FC, memo, useState } from "react";
import { CompFormSelector } from "./components/CompFormSelector";
import { CompTypeSelect } from "./components/CompTypeSelect";
import "./styles.css";
interface CompsFinderAddCompModalProps {
  className?: string;
  onlyIcon?: boolean;
}

export const CompsFinderAddCompModal: FC<CompsFinderAddCompModalProps> = memo(
  ({ className }) => {
    const prefix = "acq-comps-finder-add-comp-modal";
    const [compType, setCompType] = useState<CompstackCompType>(null);
    const [hideSelect, setHideSelect] = useState(false);

    const getClasses = () => {
      const classes = [prefix];
      className && classes.push(className);
      return classes.join(" ");
    };

    return (
      <Modal
        size="big"
        className={prefix}
        disclosure={
          <Button
            title="Add new comp"
            kind="solid"
            className={getClasses()}
            icon={<PlusCircleIcon />}
          >
            Add new comp
          </Button>
        }
        // workaround to prevent focus trap
        options={{ modal: false, animated: true }}
      >
        {(dialog) => (
          <>
            <Modal.Header
              onClose={() => {
                dialog.hide();
                setCompType(null);
              }}
            >
              Add new comp
            </Modal.Header>
            <Modal.Body>
              <CompTypeSelect
                className="px-6 py-9"
                value={compType}
                onChange={(type) => setCompType(type)}
                hideSelect={
                  hideSelect && !dialog.visible
                    ? (setHideSelect(false), hideSelect)
                    : hideSelect
                }
              />

              <CompFormSelector
                compType={compType}
                onClose={() => {
                  dialog.hide();
                  setCompType(null);
                }}
                onSave={() => {
                  setHideSelect(true);
                }}
                modalIsVisible={dialog.visible}
              />
            </Modal.Body>
          </>
        )}
      </Modal>
    );
  }
);

CompsFinderAddCompModal.displayName = "CompsFinderAddCompModal";
