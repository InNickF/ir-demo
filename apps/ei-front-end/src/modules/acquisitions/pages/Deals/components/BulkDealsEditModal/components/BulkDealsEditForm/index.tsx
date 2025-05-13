import { useMutatePatchBulkDealsInformation } from "@/modules/acquisitions/services/mutations/deals";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { transformDealToPayload } from "@/modules/acquisitions/utils/data-transformations";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { bulkEditDealsAtom } from "../../../../store/bulk-edit";
import { BulkDealsSelect } from "./components/BulkDealsSelect";
import { cleanEmptyObjectKeys } from "./utils";
import { bulkEditInputs } from "./utils/bulkEditInputs";

interface BulkDealsEditFormProps {
  onClose: () => void;
  onSave: () => void;
}
export const BulkDealsEditForm: FC<BulkDealsEditFormProps> = ({
  onClose,
  onSave,
}) => {
  const [preselectedDeals] = useAtom(bulkEditDealsAtom);
  const state = useForm<Deal>();
  const mutation = useMutatePatchBulkDealsInformation({
    onSuccess: () => {
      onSave();
    },
  });
  const onSubmit = (data: Partial<Deal>) => {
    const clearData = cleanEmptyObjectKeys(data);
    const hasData = Object.keys(clearData).length;
    if (!hasData) {
      return;
    }
    const mergeData: Partial<Deal>[] = preselectedDeals.map((deal) => ({
      id: deal?.id,
      ...(transformDealToPayload(clearData) as Partial<Deal>),
    }));
    mutation.mutate({ deals: mergeData });
  };

  return (
    <form onSubmit={state.handleSubmit(onSubmit)}>
      <section className="grid grid-cols-1 gap-6 p-4 pb-8 md:grid-cols-3">
        <BulkDealsSelect className="col-span-1 md:col-span-3" />
        {bulkEditInputs.map((field) => {
          return <Fragment key={field.key}>{field.render({ state })}</Fragment>;
        })}
      </section>
      <footer className="flex flex-col-reverse md:flex-row">
        <Button
          block
          kind="ghost"
          onClick={onClose}
          disabled={mutation.isLoading}
        >
          Cancel
        </Button>
        <Button block type="submit" disabled loading={mutation.isLoading}>
          Save
        </Button>
      </footer>
    </form>
  );
};
