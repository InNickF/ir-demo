import { DealPhase, PipelineStage } from "@/acquisitions/typings/deals";

export const pipelineStages: PipelineStage[] = [
  { name: "Screening", id: "SCREENING" },
  { name: "LOI", id: "LOI" },
  { name: "PSA", id: "PSA" },
  { name: "DD/Legal", id: "DD" },
  { name: "Closed", id: "CLOSED" },
  { name: "Dead Deals", id: "DEAD" },
];

export const findNextStage = (dealPhase) => {
  const notNextStages = ["CLOSED", "DEAD"];
  if (notNextStages.includes(dealPhase)) {
    return null;
  }

  const currentStageIndex = pipelineStages.findIndex(
    (stage) => stage.id === dealPhase
  );

  const nextStageIndex = currentStageIndex + 1;
  return pipelineStages[nextStageIndex];
};

export const possibleStages = (dealPhase) => {
  const options: {
    [phase in Exclude<DealPhase, "CLOSING">]: Exclude<DealPhase, "CLOSING">[];
  } = {
    SCREENING: ["LOI", "PSA", "DD", "CLOSED", "DEAD"],
    LOI: ["SCREENING", "PSA", "DD", "CLOSED", "DEAD"],
    PSA: ["SCREENING", "LOI", "DD", "CLOSED", "DEAD"],
    DD: ["SCREENING", "LOI", "PSA", "CLOSED", "DEAD"],
    // CLOSING: ["SCREENING", "LOI", "PSA", "DD", "CLOSED", "DEAD"],
    CLOSED: ["SCREENING", "LOI", "PSA", "DD", "DEAD"],
    DEAD: ["SCREENING", "LOI", "PSA", "DD", "CLOSED"],
  };

  return options[dealPhase];
};
