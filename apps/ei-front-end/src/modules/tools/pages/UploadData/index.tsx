import { NextPageWithLayout } from "@/commons/typings";
import { ToolsHead } from "@/tools/components/general/ToolsHead";
import { InToolsPermissionsLayout } from "@/tools/layouts/InToolsPermissionsLayout";
import { ToolsLayout } from "@/tools/layouts/ToolsLayout";
import { useMutatePushRentRollOrCashflowData } from "@/tools/services/mutation/tools";
import "@/tools/styles/index.css";
import { Container } from "in-ui-react";
import { ReactElement, useState } from "react";
import { UploadDataFromExcelPayload } from "../../typings/tools";
import { UploadDataForm } from "./components/UploadDataForm";

const UploadData: NextPageWithLayout = () => {
  const mutation = useMutatePushRentRollOrCashflowData();
  const [isLoading, setIsLoading] = useState(false);

  const pushData = (data: UploadDataFromExcelPayload) => {
    setIsLoading(true);
    mutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <section className="tools-basic-form-page">
      <Container className="tools-basic-form-page__container">
        <UploadDataForm
          isLoading={isLoading}
          onSubmit={(data) => {
            pushData(data);
          }}
        />
      </Container>
    </section>
  );
};

UploadData.getLayout = (page: ReactElement) => {
  return (
    <InToolsPermissionsLayout>
      <ToolsHead title="Upload Data" />
      <ToolsLayout title="Upload Data">{page}</ToolsLayout>
    </InToolsPermissionsLayout>
  );
};

export default UploadData;
