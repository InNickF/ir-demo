import { DistributionsContributionsKPIs } from "@/modules/assets/typings/investing-performance";
import { distributionsContributionsKPIsHeaderFormatter } from "@/modules/assets/entities/abstracts/distribution-contribution";
import { distributionsContributionsKPIsFormatter } from "@/modules/assets/entities/abstracts/distribution-contribution";
import { Table } from "in-ui-react";
import { FC } from "react";

interface DistributionAndContributionKPIsTableProps {
  data: DistributionsContributionsKPIs;
}
export const DistributionAndContributionKPIsTable: FC<
  DistributionAndContributionKPIsTableProps
> = ({ data }) => {
  return (
    <Table>
      <Table.Body>
        {Object.entries(data).map(([key, value]) => (
          <Table.Row key={key}>
            <Table.Data className="py-3">
              {
                distributionsContributionsKPIsHeaderFormatter.format({
                  key: key as keyof DistributionsContributionsKPIs,
                }).value
              }
            </Table.Data>
            <Table.Data className="py-3" monospaceFont textAlignment="right">
              {
                distributionsContributionsKPIsFormatter.format({
                  key: key as keyof DistributionsContributionsKPIs,
                  original: data,
                  value,
                }).value
              }
            </Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
