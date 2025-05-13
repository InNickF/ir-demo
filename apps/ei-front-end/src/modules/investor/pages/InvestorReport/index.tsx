import { downloadFileFromURL } from "@/commons/services/api/downloadFileFromURL";
import { addNotificationAtom } from "@/commons/store/jotai/notifications";
import { NextPageWithLayout } from "@/commons/typings";
import { InvestorHead } from "@/investor/components/general/InvestorHead";
import { InvestorLayout } from "@/investor/layouts/InvestorLayout";
import { InvestorPermissionsLayout } from "@/investor/layouts/InvestorPermissionsLayout";
import { useMutateGetInvestorReport } from "@/investor/services/mutation/investor";
import { Container } from "in-ui-react";
import { useAtom } from "jotai";
import { ReactElement, useState } from "react";
import { GenerateReportForm } from "./components/GenerateReportForm";
import "./styles.css";

const InvestorReport: NextPageWithLayout = () => {
  const investorReportMutation = useMutateGetInvestorReport();
  const [isLoading, setIsLoading] = useState(false);
  const [, createNotification] = useAtom(addNotificationAtom);

  const exportInvestorReport = (data) => {
    setIsLoading(true);
    investorReportMutation.mutate(data, {
      onSuccess: (report) => {
        if (data.multipleFiles !== "yes") {
          const { file, name } = report[0].spreadsheet;
          downloadFileFromURL({ url: file, fileName: name })
            .then(() => {
              createNotification({
                kind: "success",
                subject: "File Downloaded",
                message: "Investor report exported successfully",
              });
            })
            .catch(() => {
              createNotification({
                kind: "error",
                subject: "File Download Failed",
                message: "Investor report export failed",
              });
            });
        } else {
          report.forEach((item) => {
            const { file, name } = item.spreadsheet;
            downloadFileFromURL({ url: file, fileName: name })
              .then(() => {
                createNotification({
                  kind: "success",
                  subject: "File Downloaded",
                  message: "Investor report exported successfully",
                });
              })
              .catch(() => {
                createNotification({
                  kind: "error",
                  subject: "File Download Failed",
                  message: "Investor report export failed",
                });
              });
          });
        }
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };
  return (
    <section className="investor-generate-report-page">
      <Container className="investor-generate-report-page__container">
        <GenerateReportForm
          isLoading={isLoading}
          onSubmit={(data) => exportInvestorReport(data)}
        />
      </Container>
    </section>
  );
};

InvestorReport.getLayout = (page: ReactElement) => {
  return (
    <InvestorPermissionsLayout>
      <InvestorHead title="Cash Flow Detail" />
      <InvestorLayout title="Cash Flow Detail">{page}</InvestorLayout>
    </InvestorPermissionsLayout>
  );
};

export default InvestorReport;
