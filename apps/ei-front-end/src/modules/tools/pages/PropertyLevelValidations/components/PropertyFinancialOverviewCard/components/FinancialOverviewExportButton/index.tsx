import { downloadExcelFileFromAPIResponse } from "@/commons/services/api/downloadExcelFileFromAPIResponse";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { parseError } from "@/commons/model-in/formatters/utils/errors";
import { transformAPIResponseForExport } from "@/modules/tools/utils";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

interface FinancialOverviewExportButtonProps<T> {
  data: T[];
  fileName: string;
  buttonTitle?: string;
}

export const FinancialOverviewExportButton = <T,>({
  data,
  fileName,
  buttonTitle = "Export to Excel",
}: FinancialOverviewExportButtonProps<T>) => {
  const [, createNotification] = useAtom(addNotificationAtom);
  const router = useRouter();
  const { month, year, property } = router.query;
  const [isExporting, setIsExporting] = useState(false);

  const exportTable = async () => {
    try {
      const sanitizedFileName = fileName.replace(/\s+/g, "_");

      downloadExcelFileFromAPIResponse({
        data: transformAPIResponseForExport(data),
        fileName: `${sanitizedFileName}_${property}_${month}/${year}`,
      });
      createNotification({
        subject: `${fileName} Exported`,
        message: `File successfully exported`,
        kind: "success",
      });
    } catch (error) {
      createNotification({
        subject: `Error Exporting ${fileName}`,
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
    >
      {buttonTitle}
    </Button>
  );
};
