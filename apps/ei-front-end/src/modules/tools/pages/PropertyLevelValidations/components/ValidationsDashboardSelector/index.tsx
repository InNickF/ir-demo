import { FC, useMemo } from "react";
import { ListValidationDashboard } from "../ListValidationDashboard";
import { SinglePropertyValidationDashboard } from "../SinglePropertyValidationDashboard";
import { useRouter } from "next/router";

const validationDataStatuses = ["list", "single"] as const;

type ValidationDataStatus = typeof validationDataStatuses[number];

const getValidDashboard = (status: ValidationDataStatus) => {
  const components: Record<ValidationDataStatus, FC> = {
    list: ListValidationDashboard,
    single: SinglePropertyValidationDashboard,
  };
  return components?.[status];
};

const useValidDashboard = () => {
  const router = useRouter();

  const ValidDashboard = useMemo(() => {
    const { list_code, month, year } = router.query;

    const getView = (): ValidationDataStatus => {
      if (list_code && month && year) {
        return "list";
      }
      return "single";
    };

    const component = getValidDashboard(getView());

    if (!component) {
      router.push("/tools/");
    }

    return component;
  }, [router]);

  return ValidDashboard;
};

export const ValidationsDashboardSelector: FC = () => {
  const ValidDashboard = useValidDashboard();
  return <ValidDashboard />;
};
