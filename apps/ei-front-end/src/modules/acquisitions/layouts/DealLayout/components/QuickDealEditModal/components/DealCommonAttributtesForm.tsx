import { getDealCommonEditableAttributes } from "@/acquisitions/components/data-entry/DealInformationFormInputs";
import { useMutateEditDealCommonAttributes } from "@/acquisitions/services/mutations/deals";
import {
  DealCommonEditableAttributes,
  DealCommonEditableAttributesPayload,
  DealPhase,
  ExtendedDealInformation,
} from "@/acquisitions/typings/deals";
import { getGenericValueOrString } from "@/commons/utils";
import { Button, Modal } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface DealCommonAttributesForm {
  deal: ExtendedDealInformation;
  onAction: () => void;
}

export const DealCommonAttributesForm: FC<DealCommonAttributesForm> = ({
  deal,
  onAction,
}) => {
  const router = useRouter();
  const { dealId } = router.query;
  const [loading, setLoading] = useState(false);

  const mutateDealCommonAttributes = useMutateEditDealCommonAttributes();

  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm<DealCommonEditableAttributes>({
    defaultValues: {
      phase: deal?.phase,
      status: deal?.status,
      law_firm_closing_probability: deal?.law_firm_closing_probability,
    },
  });

  const inputs = useMemo(
    () => {
      const validPhases: DealPhase[] = (
        ["SCREENING", "LOI", "PSA", "DD", "CLOSED", "DEAD"] as DealPhase[]
      ).filter((phase: DealPhase) => {
        return deal?.phase?.value === "DEAD" || phase !== "DEAD";
      });

      const inputs = getDealCommonEditableAttributes({
        control,
        getValues,
        register,
        setValue,
        specificPhases: validPhases,
      }) as ReturnType<typeof getDealCommonEditableAttributes>;

      const inputOrdering: Array<keyof DealCommonEditableAttributes> = [
        "phase",
        "status",
        "law_firm_closing_probability",
      ];
      const orderedInputsByKey = inputOrdering.map((key) =>
        inputs.find((input) => input.key === key)
      );
      return orderedInputsByKey;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateDealInformation = (data: DealCommonEditableAttributes) => {
    setLoading(true);

    const payload: DealCommonEditableAttributesPayload = {
      status: getGenericValueOrString(data?.status),
      law_firm_closing_probability: getGenericValueOrString(
        data?.law_firm_closing_probability
      ),
      phase: getGenericValueOrString(data?.phase),
    };

    mutateDealCommonAttributes.mutate(
      {
        dealId: dealId as string,
        dealInformation: payload,
      },
      {
        onSettled: () => {
          setLoading(false);
          onAction();
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateDealInformation)}>
        <Modal.Header
          onClose={() => {
            onAction();
            reset();
          }}
        >
          Quick deal edition
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-5">
            {domLoaded &&
              inputs.map((input) => {
                const { Component, key, props } = input;
                return (
                  <Component
                    key={key}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(props as any)}
                    error={errors?.[key]?.message}
                    //Prevents option dropdown from create scrollbars in modal body
                    menuPortalTarget={document.body}
                  />
                );
              })}
          </div>
        </Modal.Body>
        <div className="flex">
          <Button
            block
            kind="ghost"
            onClick={() => {
              onAction();
              reset();
            }}
          >
            Close
          </Button>
          <Button block loading={loading} type="submit" disabled>
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
