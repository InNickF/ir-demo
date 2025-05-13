import { NextPageWithLayout } from "@/commons/typings";
import { ReactElement } from "react";
import { ToolsHead } from "../../components/general/ToolsHead";
import { InToolsPermissionsLayout } from "../../layouts/InToolsPermissionsLayout";
import { ToolsLayout } from "../../layouts/ToolsLayout";
import { ValidationForm } from "./components/ValidationForm";
import { ValidationsDashboardSelector } from "./components/ValidationsDashboardSelector";
import { useHasValidQueryParams } from "./hooks/useHasValidQueryParams";

const PropertyLevelValidations: NextPageWithLayout = () => {
  const hasValidQueryParams = useHasValidQueryParams();

  return hasValidQueryParams ? (
    <ValidationsDashboardSelector />
  ) : (
    <ValidationForm />
  );
};

PropertyLevelValidations.getLayout = (page: ReactElement) => {
  return (
    <InToolsPermissionsLayout>
      <ToolsHead title="Property Level Validations" />
      <ToolsLayout title="Property Level Validations">{page}</ToolsLayout>
    </InToolsPermissionsLayout>
  );
};

export default PropertyLevelValidations;
