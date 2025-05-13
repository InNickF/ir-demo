import { useListValidationQueryParams } from "@/modules/tools/pages/PropertyLevelValidations/hooks/useListValidationQueryParams";
import { useMutateTriggerDAGNotification } from "@/modules/tools/services/mutation/property-level-validations";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "in-ui-react";

export const DAGTriggerButton = ({ className }: { className?: string }) => {
  const { month, year } = useListValidationQueryParams();

  const triggerMutation = useMutateTriggerDAGNotification();

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Tooltip content="Re-run the validation rules for the selected month and year.">
      <Button
        className={getClasses()}
        icon={<ArrowPathIcon />}
        kind="solid"
        size="small"
        loading={triggerMutation.isLoading}
        disabled
        onClick={() => triggerMutation.mutate({ month, year })}
      >
        Re-run rules
      </Button>
    </Tooltip>
  );
};
