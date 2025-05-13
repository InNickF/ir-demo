import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Tooltip } from "in-ui-react";
import { bulkEditDealsAtom } from "../../store/bulk-edit";
import { useAtom } from "jotai";
import { BulkDealsEditForm } from "./components/BulkDealsEditForm";

export const BulkDealsEditModal = () => {
  const prefix = "acq-deals-bulk-edit-modal";
  const [preselectedDeals, setPreselectedDeals] = useAtom(bulkEditDealsAtom);
  const hasPreselectedDeals = preselectedDeals.length > 0;

  return (
    <Modal
      size="big"
      className={prefix}
      disclosure={
        <div>
          <Tooltip
            content="There are preselected deals to edit"
            hidden={!hasPreselectedDeals}
          >
            <Button
              kind="outline"
              iconPosition="left"
              icon={
                hasPreselectedDeals ? (
                  <InformationCircleIcon className="in-ui-icon in-ui-icon--normal-size text-warning" />
                ) : null
              }
            >
              Bulk Edit
            </Button>
          </Tooltip>
        </div>
      }
      // workaround to prevent focus trap
      options={{ modal: false }}
    >
      {(dialog) => (
        <>
          <Modal.Header
            onClose={() => {
              dialog.hide();
            }}
          >
            Bulk Deals Edit
          </Modal.Header>
          {dialog.visible ? (
            <BulkDealsEditForm
              onClose={() => dialog.hide()}
              onSave={() => {
                setPreselectedDeals([]);
                dialog.hide();
              }}
            />
          ) : null}
        </>
      )}
    </Modal>
  );
};
