import { DebouncedSearchInput } from "@/commons/components/data-entry/DebouncedSearchInput";
import { FC } from "react";
import { ChosenDateTag } from "../../../../../ChosenDateTag";
import { useRouter } from "next/router";
import { ValidationRulesExportButton } from "../../../../../ValidationRulesExportButton";
import { DAGTriggerButton } from "../../../../../DAGTriggerButton";

interface ListValidationContentCardActionsProps {
  onSearch: (search: string) => void;
}

export const ListValidationContentCardActions: FC<
  ListValidationContentCardActionsProps
> = ({ onSearch }) => {
  const router = useRouter();
  const { list_code } = router.query;

  return (
    <div className="flex flex-wrap gap-2 sm:justify-end sm:items-center">
      <ChosenDateTag />
      <ValidationRulesExportButton type="list" listCode={list_code as string} />
      <DAGTriggerButton />
      <DebouncedSearchInput
        placeholder="Search Property..."
        onSearch={(value) => onSearch(value)}
        color="glass"
      />
    </div>
  );
};
