import { GenericStepBarChartDataSchema } from "@/commons/schemas/charts";
import { LegacyGenericLabelValueObjectSchema } from "@/commons/schemas/filters";
import { GenericLabelValueObject } from "@/commons/typings";
import { GenericStepBarChartData } from "@/commons/typings/charts";
import { z } from "zod";
import { modifierGenerator } from "..";

interface StepBarChartDataModifierParams {
  data: GenericLabelValueObject<z.ZodType<number>>[];
}
export const stepBarChartDataModifier = ({
  data = [],
}: StepBarChartDataModifierParams): GenericStepBarChartData[] => {
  return data?.map((currentElement, index, originalArray) => {
    const isTotal = currentElement.label === "Total";
    const prevValue = isTotal
      ? (originalArray[index - 1]?.value || 0) + 1
      : originalArray
          .slice(0, index)
          .reduce((sum, el) => sum + (el.value || 0), 0);
    const currentValue = currentElement.value || 0;
    const stepValue = prevValue + currentValue;

    const mod = modifierGenerator({
      original: LegacyGenericLabelValueObjectSchema(z.number()),
      target: GenericStepBarChartDataSchema,
      map: {
        category: "label",
        displayValue: "value",
        open: () => prevValue,
        value: () => stepValue,
        stepValue: () => stepValue,
      },
    });

    return mod({ data: currentElement }).modified;
  });
};
