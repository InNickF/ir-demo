import { downloadFileFromURL } from "@/commons/services/api/downloadFileFromURL";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { useDealIdFromQueryParams } from "@/modules/acquisitions/hooks/useDealIdFromQueryParams";
import { useMutateGetMarketAnalyticsPageDataReports } from "@/modules/acquisitions/services/mutations/reports";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";
import { FC, useState } from "react";

interface DealMarketAnalyticsExportDataButtonProps {
  className?: string;
}

export const DealMarketAnalyticsExportDataButton: FC<
  DealMarketAnalyticsExportDataButtonProps
> = ({ className }) => {
  const prefix = "acq-ma-export-data-button";

  const mutation = useMutateGetMarketAnalyticsPageDataReports();
  const [isExporting, setIsExporting] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const dealId = useDealIdFromQueryParams();

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const exportChartsData = () => {
    setIsExporting(true);
    mutation.mutate(
      {
        filters: {
          deal_id: dealId,
        },
      },
      {
        onSuccess: (report) => {
          const { file, name } = report.spreadsheet;
          downloadFileFromURL({ url: file, fileName: name })
            .then(() => {
              createNotification({
                kind: "success",
                subject: "Report Downloaded",
                message: "File exported successfully",
              });
            })
            .catch(() => {
              createNotification({
                kind: "error",
                subject: "Report Download Failed",
                message: "File export failed",
              });
            });
        },
        onSettled: () => {
          setIsExporting(false);
        },
      }
    );
  };

  return (
    <Button
      block
      kind="outline"
      className={getClasses()}
      onClick={exportChartsData}
      loading={isExporting}
      disabled
    >
      Export Page Data
    </Button>
  );
};
