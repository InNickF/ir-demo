import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { IsLoadingProp } from "@/commons/typings";
import { useAssignCompstackComp } from "@/modules/acquisitions/hooks/useAssignCompstackComp";
import { useUnlinkCompstackComp } from "@/modules/acquisitions/hooks/useUnlinkCompstackComp";
import { Deal } from "@/modules/acquisitions/typings/deals";
import { getCompstackCompId } from "@/modules/acquisitions/utils/compstack-comps";
import { Button } from "in-ui-react";
import { FC } from "react";

interface CompFinderCompDrawerActionProps extends IsLoadingProp {
  comp: CompstackComp;
  deal?: Deal;
  dealComps?: CompstackComp[];
}
export const CompFinderCompDrawerAction: FC<
  CompFinderCompDrawerActionProps
> = ({ comp, deal, isLoading, dealComps = [] }) => {
  const { onAssign, isAssigning } = useAssignCompstackComp();
  const { onUnlink, isUnlinking } = useUnlinkCompstackComp();

  const isAssigned = dealComps?.some(
    (dealComp) => getCompstackCompId(dealComp) === getCompstackCompId(comp)
  );

  const buttonMessage = isAssigned
    ? "Unlink comp from deal"
    : "Link comp to deal";

  const loading = isLoading || isAssigning({ comp }) || isUnlinking({ comp });

  return (
    <div>
      <Button
        loading={loading}
        color={isAssigned ? "error" : "primary"}
        block
        disabled
      >
        {buttonMessage}
      </Button>
    </div>
  );
};
