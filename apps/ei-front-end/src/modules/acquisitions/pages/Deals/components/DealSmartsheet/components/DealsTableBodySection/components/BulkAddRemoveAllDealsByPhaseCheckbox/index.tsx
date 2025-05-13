import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { bulkEditDealsAtom } from "@/modules/acquisitions/pages/Deals/store/bulk-edit";
import { DealPhase } from "@/modules/acquisitions/typings/deals";
import { Checkbox, Tooltip } from "in-ui-react";
import { useAtom } from "jotai";
import { FC } from "react";
import { useDealsQueriesByPhase } from "../../../../hooks/useDealsQueriesByPhase";

interface BulkAddRemoveAllDealsByPhaseCheckboxProps {
  isSortingDisabled?: boolean;
  phase: DealPhase;
}

export const BulkAddRemoveAllDealsByPhaseCheckbox: FC<
  BulkAddRemoveAllDealsByPhaseCheckboxProps
> = ({ isSortingDisabled, phase }) => {
  const [preselectedDeals, setPreselectedDeals] = useAtom(bulkEditDealsAtom);
  const { phasesSectionData, isLoading } = useDealsQueriesByPhase({});

  const phaseDeals = phasesSectionData.find((section) => section.id === phase);
  const phaseDealsData = phaseDeals?.data;

  const areAllDealsSelected =
    phaseDealsData.every((deal) =>
      preselectedDeals.some((selectedDeal) => selectedDeal.id === deal.id)
    ) && phaseDealsData.length > 0;

  const handleBulkAddRemoveAllDeals = () => {
    if (areAllDealsSelected) {
      setPreselectedDeals(
        preselectedDeals.filter(
          (preselectedDeal) =>
            !phaseDealsData.some(
              (phaseDeal) => phaseDeal.id === preselectedDeal.id
            )
        )
      );
    } else {
      const cleanPreselectedDeals = preselectedDeals.filter(
        (preselectedDeal) =>
          !phaseDealsData.some(
            (phaseDeal) => phaseDeal.id === preselectedDeal.id
          )
      );
      setPreselectedDeals([...cleanPreselectedDeals, ...phaseDealsData]);
    }
  };

  const phaseName = convertToTitleCase(phase);

  const disableCheckbox =
    isLoading ||
    isSortingDisabled ||
    !phaseDealsData ||
    !phaseDealsData?.length;

  const regularTooltipContent = areAllDealsSelected
    ? `Remove all ${phaseName} deals from bulk edit`
    : `Add all ${phaseName} deals to bulk edit`;

  const disableTooltipContent = {
    noDeals: `No ${phaseName} deals to add to bulk edit`,
    isLoading: `Loading ${phaseName} deals`,
    isSortingDisabled: `Remove current filtering or sorting to enable phase bulk actions`,
  };

  const getTooltipContent = () => {
    if (disableCheckbox) {
      if (!phaseDealsData || !phaseDealsData?.length) {
        return disableTooltipContent.noDeals;
      }
      if (isLoading || phaseDeals?.isRefetching) {
        return disableTooltipContent.isLoading;
      }
      if (isSortingDisabled) {
        return disableTooltipContent.isSortingDisabled;
      }
    }
    return regularTooltipContent;
  };

  return (
    <Tooltip content={<p>{getTooltipContent()}</p>}>
      <div>
        <Checkbox
          checked={areAllDealsSelected}
          onChange={handleBulkAddRemoveAllDeals}
          disabled={disableCheckbox}
          style={{
            transform: "scale(.7)",
          }}
        />
      </div>
    </Tooltip>
  );
};
