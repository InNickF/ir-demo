import { DealFinancialScenario } from "@/acquisitions/typings/deals";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { deprecated_ellipseLongText } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button, Card, Heading, Tooltip } from "in-ui-react";
import { FC, MouseEvent } from "react";
import "./styles.css";
import { numberToPercent } from "@/commons/model-in/formatters/utils/amount-conversions";

interface ScenarioCardProps {
  isActive: boolean;
  scenario: DealFinancialScenario;
  onEdit: (scenario: DealFinancialScenario) => void;
  onClick: (scenarioId: DealFinancialScenario["scenario_id"]) => void;
}
export const ScenarioCard: FC<ScenarioCardProps> = ({
  isActive,
  scenario,
  onEdit,
  onClick,
}) => {
  const getClasses = (): string => {
    const classes = ["acq-scenario-card"];
    isActive && classes.push("acq-scenario-card--active");
    return classes.join(" ");
  };

  return (
    <button
      className="p-0 bg-transparent border-none"
      onClick={() => {
        onClick(scenario?.scenario_id);
      }}
    >
      <Card className={getClasses()}>
        <ScenarioCardHeader scenario={scenario} onEdit={onEdit} />
        <ScenarioCardBody scenario={scenario} />
      </Card>
    </button>
  );
};

const ScenarioCardHeader: FC<
  Omit<ScenarioCardProps, "isActive" | "onClick">
> = ({ scenario, onEdit }) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onEdit(scenario);
  };
  const maxTitleLength = 15;
  const title = deprecated_ellipseLongText({
    text: scenario.name || genericNoDataText,
    maxLength: maxTitleLength,
  });
  const hasToShowTitleTooltip = scenario?.name?.length >= maxTitleLength;

  return (
    <header className="acq-scenario-card__header">
      <Tooltip content={scenario?.name} hidden={!hasToShowTitleTooltip}>
        <Heading kind="h4">{title}</Heading>
      </Tooltip>

      <Tooltip content="Edit Scenario">
        <Button
          onlyIcon
          onClick={onClick}
          size="small"
          icon={<PencilIcon />}
          kind="ghost"
        />
      </Tooltip>
    </header>
  );
};

const ScenarioCardBody: FC<
  Omit<ScenarioCardProps, "isActive" | "onEdit" | "onClick">
> = ({ scenario }) => {
  return (
    <section className="acq-scenario-card__body">
      {Object.entries(scenario.kpis).map(([label, value]) => {
        const formattedValue = value
          ? label.toLowerCase().includes("irr")
            ? numberToPercent(value)
            : `${value.toFixed(2)}x`
          : genericNoDataText;

        const formattedLabel = humanizeSnakeCase(label);

        return (
          <ScenarioCardBodyItem
            key={label}
            label={convertToTitleCase(formattedLabel)}
            value={formattedValue}
          />
        );
      })}
    </section>
  );
};

interface ScenarioCardBodyItemProps {
  label: string;
  value: string;
}
const ScenarioCardBodyItem: FC<ScenarioCardBodyItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="acq-scenario-card__body__item">
      <p className="text-sm text-silver">{label}</p>
      <p className="text-sm text-silver">{value}</p>
    </div>
  );
};
