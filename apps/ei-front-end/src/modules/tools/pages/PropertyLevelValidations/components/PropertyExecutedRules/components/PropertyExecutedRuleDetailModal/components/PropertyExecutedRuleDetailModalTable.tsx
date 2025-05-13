import { PropertyRuleDetail } from "@/modules/tools/typings/property-level-validations";
import { Table } from "in-ui-react";
import { FC } from "react";
import "../styles.css";
import { humanizeSnakeCase } from "@/commons/model-in/formatters/utils";

export const PropertyExecutedRuleDetailModalTable: FC<{
  ruleDetails: PropertyRuleDetail[];
  className?: string;
  ordering?: string;
  onChangeOrdering?: (ordering: string) => void;
}> = ({ ruleDetails, className, ordering, onChangeOrdering }) => {
  const prefix = "tools-property-executed-rule-detail-modal-table";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };
  const tableHeaders = ruleDetails?.[0] && Object.keys(ruleDetails[0]);

  return (
    <Table className={getClasses()}>
      {tableHeaders?.map((header) => {
        return (
          <Table.Header
            key={header}
            ordering={ordering}
            orderingKey={header}
            onOrdering={(orderingKey) => null}
          >
            {humanizeSnakeCase(header)}
          </Table.Header>
        );
      })}
      <Table.Body>
        {ruleDetails?.map((ruleDetail, index) => {
          return (
            <Table.Row key={index}>
              {tableHeaders?.map((header) => {
                return (
                  <Table.Data key={header}>{ruleDetail[header]}</Table.Data>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
