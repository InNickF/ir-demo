import { useEquityRequirements } from "@/acquisitions/services/queries/deals";
import { LegendArrow } from "@/commons/components/data-display/LegendArrow";
import { downloadFileFromURL } from "@/commons/services/api/downloadFileFromURL";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { GenericFilterPayload } from "@/commons/typings";
import { useMutateGetEquityRequirementReports } from "@/acquisitions/services/mutations/reports";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button, CardProps, Loader } from "in-ui-react";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import "./styles.css";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { Loader3D } from "@/commons/components/3d/Loader3D";

const EquityRequirementsChart = dynamic(
  () => import("./components/EquityRequirementsChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full justify-center items-center h-96">
        <Loader3D
          kind="chart"
          style={{
            minHeight: 350,
          }}
          isLoading
          localIsLoading
          onChangeIsLoading={() => null}
        />
      </div>
    ),
  }
);

interface EquityRequirementsProps extends CardProps {
  filters: GenericFilterPayload;
}
export const EquityRequirements: FC<EquityRequirementsProps> = ({
  filters,
  ...props
}) => {
  const exportReports = useMutateGetEquityRequirementReports();
  const { data, isLoading, isRefetching } = useEquityRequirements(filters);
  const [isExporting, setIsExporting] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const exportEquityRequirements = () => {
    setIsExporting(true);
    exportReports.mutate(
      { filters },
      {
        onSuccess: (report) => {
          const { file, name } = report.spreadsheet;
          downloadFileFromURL({ url: file, fileName: name })
            .then(() => {
              createNotification({
                kind: "success",
                subject: "File Downloaded",
                message: "Equity Requirements Report exported successfully",
              });
            })
            .catch(() => {
              createNotification({
                kind: "error",
                subject: "File Download Failed",
                message: "Equity Requirements Report export failed",
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
    <CardWithHeader
      title="Equity Requirements"
      icon={<CurrencyDollarIcon />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      loaderKind="chart"
      headerActions={
        <>
          <LegendArrow upText="Amounts" rightText="Months" />
          <Button
            kind="outline"
            loading={isExporting}
            onClick={exportEquityRequirements}
            disabled
          >
            Export
          </Button>
        </>
      }
      hasDataToShow={!!data?.length}
      {...props}
    >
      <EquityRequirementsChart id="equityRequirements" data={data} />
    </CardWithHeader>
  );
};
