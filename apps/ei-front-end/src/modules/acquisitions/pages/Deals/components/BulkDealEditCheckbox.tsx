import { Deal } from "@/modules/acquisitions/typings/deals";
import { Checkbox, CheckboxProps, Tooltip } from "in-ui-react";
import { useAtom } from "jotai";
import { FC } from "react";
import { bulkEditDealsAtom } from "../store/bulk-edit";

interface BulkDealEditCheckboxProps extends CheckboxProps {
  currentDeal: Deal;
}
export const BulkDealEditCheckbox: FC<BulkDealEditCheckboxProps> = ({
  currentDeal,
  className,
  ...props
}) => {
  const [selectedDeals, setSelectedDeals] = useAtom(bulkEditDealsAtom);
  const isChecked = selectedDeals.some((deal) => deal.id === currentDeal.id);

  const addOrRemoveDealToBulkEdit = () => {
    setSelectedDeals((deals) => {
      const isDealAlreadySelected = deals.some(
        (deal) => deal.id === currentDeal.id
      );

      if (isDealAlreadySelected) {
        return deals.filter((deal) => deal.id !== currentDeal.id);
      }

      return [...deals, currentDeal];
    });
  };

  return (
    <Tooltip
      content={<p>{isChecked ? "Remove from" : "Add to"} bulk edition</p>}
    >
      <Checkbox
        {...props}
        className={className}
        checked={isChecked}
        onClick={addOrRemoveDealToBulkEdit}
      />
    </Tooltip>
  );
};
