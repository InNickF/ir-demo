import { downloadExcelFileFromAPIResponse } from "@/commons/services/api/downloadExcelFileFromAPIResponse";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { PropertyRuleDetail } from "@/modules/tools/typings/property-level-validations";
import { transformAPIResponseForExport } from "@/modules/tools/utils";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface PropertyExecutedRuleDetailModalExportButtonProps {
  propertyCode: string;
  ruleDetails: PropertyRuleDetail[];
}

export const PropertyExecutedRuleDetailModalExportButton: FC<
  PropertyExecutedRuleDetailModalExportButtonProps
> = ({ propertyCode, ruleDetails }) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const router = useRouter();
  const { month, year } = router.query;
  const [isExporting, setIsExporting] = useState(false);

  const exportTable = async () => {
    try {
      downloadExcelFileFromAPIResponse({
        data: transformAPIResponseForExport(ruleDetails),
        fileName: `${propertyCode}_Rule_Detail_${month}/${year}`,
      });
      createNotification({
        subject: `${propertyCode} Rule Detail Exported`,
        message: `File successfully exported`,
        kind: "success",
      });
    } catch (error) {
      createNotification({
        subject: `Error Exporting Property Rule Detail`,
        message: parseError(
          error,
          `Unable to export file. Please try again later."`
        ),
        kind: "error",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      icon={<DocumentArrowDownIcon />}
      iconPosition="left"
      kind="outline"
      size="small"
      className="w-56"
      loading={isExporting}
      onClick={exportTable}
      disabled
    >
      Export Rule Detail
    </Button>
  );
};
