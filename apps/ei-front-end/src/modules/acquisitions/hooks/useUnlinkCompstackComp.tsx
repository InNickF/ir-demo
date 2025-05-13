import { DeleteDealCompstackLeaseCompUnlinkParams } from "@/acquisitions/services/api/deals";
import {
  useMutationDeleteDealCompstackLandCompUnlink,
  useMutationDeleteDealCompstackLeaseCompUnlink,
  useMutationDeleteDealCompstackSaleCompUnlink,
} from "@/acquisitions/services/mutations/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { getCompstackCompId } from "@/acquisitions/utils/compstack-comps";

interface UseUnlinkCompstackCompReturnType {
  isUnlinking: IsUnlinkingFnType;
  onUnlink: OnUnlinkFnType;
}

interface IsUnlinkingFnArgs {
  comp?: CompstackComp;
}
type IsUnlinkingFnType = (args: IsUnlinkingFnArgs) => boolean;

interface OnUnlinkFnArgs {
  comp: CompstackComp;
  dealId: string;
}
type OnUnlinkFnType = (args: OnUnlinkFnArgs) => void;

type UseUnlinkCompstackCompFnType = () => UseUnlinkCompstackCompReturnType;

export const useUnlinkCompstackComp: UseUnlinkCompstackCompFnType = () => {
  const unlinkCompstackLeaseComp =
    useMutationDeleteDealCompstackLeaseCompUnlink();
  const unlinkCompstackSaleComp =
    useMutationDeleteDealCompstackSaleCompUnlink();
  const unlinkCompstackLandComp =
    useMutationDeleteDealCompstackLandCompUnlink();

  const isUnlinking: IsUnlinkingFnType = ({ comp }) => {
    if (comp?.type === "lease") {
      return (
        unlinkCompstackLeaseComp.isLoading &&
        unlinkCompstackLeaseComp.variables.compId === getCompstackCompId(comp)
      );
    }
    if (comp?.type === "sale") {
      return (
        unlinkCompstackSaleComp.isLoading &&
        unlinkCompstackSaleComp.variables.compId === getCompstackCompId(comp)
      );
    }
    if (comp?.type === "land") {
      return (
        unlinkCompstackLandComp.isLoading &&
        unlinkCompstackLandComp.variables.compId === getCompstackCompId(comp)
      );
    }

    if (!comp) {
      return (
        unlinkCompstackLeaseComp.isLoading ||
        unlinkCompstackSaleComp.isLoading ||
        unlinkCompstackLandComp.isLoading
      );
    }
    return false;
  };

  const onUnlink: OnUnlinkFnType = ({ comp, dealId }) => {
    const payload: DeleteDealCompstackLeaseCompUnlinkParams = {
      dealId: dealId,
      compId: getCompstackCompId(comp),
    };
    if (comp?.type === "lease") {
      unlinkCompstackLeaseComp.mutate(payload);
    }
    if (comp?.type === "sale") {
      unlinkCompstackSaleComp.mutate(payload);
    }
    if (comp?.type === "land") {
      unlinkCompstackLandComp.mutate(payload);
    }
  };

  return {
    isUnlinking,
    onUnlink,
  };
};
