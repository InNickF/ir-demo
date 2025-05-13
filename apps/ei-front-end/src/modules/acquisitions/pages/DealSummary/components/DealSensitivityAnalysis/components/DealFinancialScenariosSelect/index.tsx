import { DealFinancialScenario } from "@/modules/acquisitions/typings/deals";
import { Select, SelectProps } from "in-ui-react";
import { useEffect, useState } from "react";

export type DealFinancialScenariosSelectOptions = {
  label: string;
  value: number;
};

export const DealFinancialScenariosSelect = <Options, IsMulti extends boolean>(
  props: SelectProps<Options, IsMulti> & {
    scenarios?: DealFinancialScenario[];
    activeScenario?: number;
  }
) => {
  /* workaround for menuPortalTarget prop in select throwing error on server 
      side due to document not being defined on server side */
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const selectScenarios =
    props.scenarios?.map((scenario) => ({
      label: scenario.name,
      value: scenario.scenario_id,
    })) || [];

  const selectedScenario = selectScenarios?.find(
    (scenario) => scenario.value === props.activeScenario
  );

  return (
    <>
      {domLoaded ? (
        <Select
          value={selectedScenario as DealFinancialScenariosSelectOptions}
          options={selectScenarios as DealFinancialScenariosSelectOptions[]}
          menuPortalTarget={document.body}
          {...props}
        />
      ) : null}
    </>
  );
};
