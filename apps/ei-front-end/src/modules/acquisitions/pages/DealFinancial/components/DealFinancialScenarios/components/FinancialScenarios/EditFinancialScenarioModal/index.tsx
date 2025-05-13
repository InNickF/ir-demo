import { StrategyEditor } from "@/acquisitions/components/data-entry/DealStrategyEditor";
import {
  Deal,
  DealFinancialScenario,
  DealFinancialScenarioPayload,
} from "@/acquisitions/typings/deals";
import { required } from "@/commons/utils/input-validations";
import { useMutationPatchDealFinancialScenario } from "@/modules/acquisitions/services/mutations/deals";
import { Button, Input, Label, Modal } from "in-ui-react";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";

interface EditFinancialScenarioModalProps {
  scenario: DealFinancialScenario;
  onCancel: () => void;
  onAction: () => void;
  dealId: Deal["id"];
}
export const EditFinancialScenarioModal: FC<
  EditFinancialScenarioModalProps
> = ({ scenario, onCancel, onAction, dealId }) => {
  return (
    <Modal
      size="big"
      disclosure={<span className="hidden"></span>}
      modal={!!scenario}
      visible={!!scenario}
    >
      {() => (
        <>
          <Modal.Header
            onClose={() => {
              onCancel();
            }}
          >
            Edit Scenario: {scenario?.name}
          </Modal.Header>
          {scenario ? (
            <EditFinancialScenarioForm
              onAction={onAction}
              onCancel={onCancel}
              scenario={scenario}
              dealId={dealId}
            />
          ) : null}
        </>
      )}
    </Modal>
  );
};

const EditFinancialScenarioForm: FC<EditFinancialScenarioModalProps> = ({
  onAction,
  onCancel,
  scenario,
  dealId,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<DealFinancialScenarioPayload>({
    defaultValues: {
      name: scenario?.name,
      strategy: scenario?.strategy,
    },
  });

  const mutation = useMutationPatchDealFinancialScenario({
    onSuccess() {
      reset();
      onAction();
    },
  });

  const onSubmit = (data: DealFinancialScenario) => {
    mutation.mutate({
      dealId,
      scenario: data,
      scenarioId: scenario?.scenario_id?.toString(),
    });
  };

  const MemoStrategyEditor = useMemo(
    () => (
      <StrategyEditor
        tags={[]}
        content={getValues("strategy")}
        onChange={(text: string) => {
          setValue("strategy", text);
        }}
      />
    ),
    [getValues, setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Body className="flex flex-col gap-4">
        <Input
          label="Name"
          error={errors.name?.message}
          {...register("name", {
            required: required("Name"),
          })}
        />
        <div>
          <Label className="mb-2">Strategy</Label>
          {MemoStrategyEditor}
        </div>
      </Modal.Body>
      <footer className="flex">
        <Button
          block
          kind="ghost"
          onClick={() => {
            onCancel();
            reset();
          }}
        >
          Close
        </Button>
        <Button block type="submit" disabled loading={mutation.isLoading}>
          Save
        </Button>
      </footer>
    </form>
  );
};
