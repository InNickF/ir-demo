import {
  useMutationPostAssignCompstackLandCompToDeal,
  useMutationPostAssignCompstackLeaseCompToDeal,
  useMutationPostAssignCompstackSaleCompToDeal,
} from "@/acquisitions/services/mutations/deals";
import { CompstackComp } from "@/acquisitions/typings/market-analytics";
import { getCompstackCompId } from "@/acquisitions/utils/compstack-comps";
import { PostAssignCompstackCompToDealPayload } from "@/acquisitions/typings/deals";

interface UseAssignCompstackCompReturnType {
  isAssigning: IsAssigningFnType;
  onAssign: OnAssignFnType;
}

interface IsAssigningFnArgs {
  comp: CompstackComp;
}
type IsAssigningFnType = (args?: IsAssigningFnArgs) => boolean;

interface OnAssignFnArgs {
  comp: CompstackComp;
  dealId: string;
}
type OnAssignFnType = (args: OnAssignFnArgs) => void;

type UseAssignCompstackCompFnType = () => UseAssignCompstackCompReturnType;

export const useAssignCompstackComp: UseAssignCompstackCompFnType = () => {
  const assignCompstackLeaseCompMutation =
    useMutationPostAssignCompstackLeaseCompToDeal();
  const assignCompstackSaleCompMutation =
    useMutationPostAssignCompstackSaleCompToDeal();
  const assignCompstackLandCompMutation =
    useMutationPostAssignCompstackLandCompToDeal();

  const isAssigning: IsAssigningFnType = ({ comp }) => {
    if (comp?.type === "lease") {
      return (
        assignCompstackLeaseCompMutation.isLoading &&
        assignCompstackLeaseCompMutation.variables.compIds.includes(
          getCompstackCompId(comp)
        )
      );
    }
    if (comp?.type === "sale") {
      return (
        assignCompstackSaleCompMutation.isLoading &&
        assignCompstackSaleCompMutation.variables.compIds.includes(
          getCompstackCompId(comp)
        )
      );
    }
    if (comp?.type === "land") {
      return (
        assignCompstackLandCompMutation.isLoading &&
        assignCompstackLandCompMutation.variables.compIds.includes(
          getCompstackCompId(comp)
        )
      );
    }
    return false;
  };

  const onAssign: OnAssignFnType = ({ comp, dealId }) => {
    const payload: PostAssignCompstackCompToDealPayload = {
      dealId: dealId,
      compIds: [getCompstackCompId(comp)],
    };

    if (comp?.type === "lease") {
      assignCompstackLeaseCompMutation.mutate(payload);
    }
    if (comp?.type === "sale") {
      assignCompstackSaleCompMutation.mutate(payload);
    }
    if (comp?.type === "land") {
      assignCompstackLandCompMutation.mutate(payload);
    }
  };

  return {
    isAssigning,
    onAssign,
  };
};
