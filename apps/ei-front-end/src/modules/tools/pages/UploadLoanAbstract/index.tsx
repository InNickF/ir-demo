import { NextPageWithLayout } from "@/commons/typings";
import { ToolsHead } from "@/tools/components/general/ToolsHead";
import { InToolsPermissionsLayout } from "@/tools/layouts/InToolsPermissionsLayout";
import { ToolsLayout } from "@/tools/layouts/ToolsLayout";
import { useMutatePostLoanAbstract } from "@/tools/services/mutation/tools";
import { Container } from "in-ui-react";
import { ReactElement, useState } from "react";
import { UploadLoanAbstractForm } from "./components/UploadLoanAbstractForm";
import "@/tools/styles/index.css";
import { UploadLoanAbstractPayload } from "../../typings/tools";

const UploadLoanAbstract: NextPageWithLayout = () => {
  const mutation = useMutatePostLoanAbstract();
  const [isLoading, setIsLoading] = useState(false);

  const uploadData = (data: UploadLoanAbstractPayload) => {
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
        <UploadLoanAbstractForm onSubmit={uploadData} isLoading={isLoading} />
      </Container>
    </section>
  );
};

UploadLoanAbstract.getLayout = (page: ReactElement) => {
  return (
    <InToolsPermissionsLayout>
      <ToolsHead title="Upload Loan Abstract" />
      <ToolsLayout title="Upload Loan Abstract">{page}</ToolsLayout>
    </InToolsPermissionsLayout>
  );
};

export default UploadLoanAbstract;
