import { useMutateDownloadPropertyValidations } from "@/modules/tools/services/mutation/property-level-validations";
import { usePropertyValidationExportTypes } from "@/modules/tools/services/queries/property-level-validations";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface ValidationRulesExportButtonProps {
  type: "property" | "list";
  propertyCode?: string;
  listCode?: string;
}

export const ValidationRulesExportButton: FC<
  ValidationRulesExportButtonProps
> = ({ type, propertyCode, listCode }) => {
  const exportMutation = useMutateDownloadPropertyValidations();
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();
  const { month, year } = router.query;

  const { data: exportTypes, isLoading: isLoadingExportTypes } =
    usePropertyValidationExportTypes();

  const selectedTypeKey = type === "property" ? "property_code" : "list_code";

  const selectedKey = type === "property" ? propertyCode : listCode;

  const dropdownActions: DropdownItem[] =
    exportTypes?.map(({ label, value }) => ({
      text: label,
      onClick: () => {
        setIsMutating(true);

        const composedFileName =
          `${selectedKey} ${label.toLocaleLowerCase()} ${month} ${year}`.replace(
            /\s+/g,
            "_"
          );

        const exportMutationPayload = {
          url: value,
          fileName: composedFileName,
          filters: {
            [selectedTypeKey]: selectedKey,
            month,
            year,
          },
        };

        exportMutation.mutate(exportMutationPayload, {
          onSettled: () => {
            setIsMutating(false);
          },
        });
      },
    })) || [];

  return (
    <Dropdown
      className="justify-self-end z-overlay"
      items={dropdownActions}
      disclosure={
        <Button
          icon={<DocumentArrowDownIcon />}
          iconPosition="left"
          kind="outline"
          size="small"
          className="w-56"
          loading={isLoadingExportTypes || isMutating}
          disabled
        >
          Export Options
        </Button>
      }
    />
  );
};
