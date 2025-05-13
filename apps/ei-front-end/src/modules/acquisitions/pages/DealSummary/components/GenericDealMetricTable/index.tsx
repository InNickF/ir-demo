import { ScreeningDealInformation } from "@/acquisitions/typings/deals";
import {
  IDefaultDealFieldsFormatter,
  defaultScreeningFieldsFormatters,
} from "@/modules/acquisitions/utils/formatters/default-screening-fields-formatters";
import { GenericLabelValueObject } from "@/commons/typings";
import { convertToTitleCase } from "@/commons/model-in/formatters/utils";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";
import { genericNoDataText } from "@/commons/model-in/formatters/utils";
import { Table } from "in-ui-react";
import { FC } from "react";

interface GenericDealMetricTableProps {
  fields: Record<string, string | number | GenericLabelValueObject>;
  formattedFields?: Array<
    IDefaultDealFieldsFormatter<ScreeningDealInformation>
  >;
  className?: string;
  inlineFields?: boolean;
}

export const GenericDealMetricTable: FC<GenericDealMetricTableProps> = ({
  fields,
  formattedFields = defaultScreeningFieldsFormatters,
  className,
  inlineFields = false,
}) => {
  const prefix = "acq-deal-metrics-table";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const inlineFieldsLabels = Object.entries(fields)
    .map(([label]) => {
      return convertToTitleCase(humanizeSnakeCase(label));
    })
    .join(" | ");

  const inlineFieldsValues = Object.entries(fields).map(([label, value]) => {
    const formattedField =
      formattedFields
        .find(({ key }) => {
          return key === label;
        })
        ?.formatter(value) || value;

    return (
      (typeof value === "object" ? value?.label : formattedField) ||
      genericNoDataText
    ).toString();
  });

  return (
    <Table className={getClasses()}>
      {inlineFields ? (
        <Table.Body>
          <Table.Row>
            <Table.Data className={`${prefix}__section__metric-label`}>
              {inlineFieldsLabels}
            </Table.Data>
            <Table></Table>
            {inlineFieldsValues.map((value, i) => {
              return (
                <Table.Data
                  key={`${value}-${i}`}
                  className={`${prefix}__section__metric-value`}
                >
                  {value}
                </Table.Data>
              );
            })}
          </Table.Row>
        </Table.Body>
      ) : (
        <Table.Body>
          {Object.entries(fields).map(([label, value]) => {
            const formattedField =
              formattedFields
                .find(({ key }) => {
                  return key === label;
                })
                ?.formatter(value) || value;

            return (
              <Table.Row key={`${label}-${value}`}>
                <Table.Header className={`${prefix}__section__metric-label`}>
                  {convertToTitleCase(humanizeSnakeCase(label))}
                </Table.Header>
                <Table.Data className={`${prefix}__section__metric-value`}>
                  {(typeof value === "object"
                    ? value?.label
                    : (typeof formattedField === "object"
                        ? formattedField?.label
                        : formattedField) || genericNoDataText) ||
                    genericNoDataText}
                </Table.Data>
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};
