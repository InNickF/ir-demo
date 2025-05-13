import { Deal } from "@/acquisitions/typings/deals";
import { CardWithHeader } from "@/commons/components/general/CardWithHeader";
import { TableCard } from "@/commons/components/general/TableCard";
import { genericGetValue } from "@/commons/model-in/formatters/utils";
import {
  numberToPercent,
  readableNumber,
} from "@/commons/model-in/formatters/utils/amount-conversions";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Table } from "in-ui-react";
import { FC } from "react";
interface DealPropertyInformationTableProps {
  deal: Deal;
  className?: string;
}

export const DealPropertyInformationTable: FC<
  DealPropertyInformationTableProps
> = ({ deal, className, ...props }) => {
  const prefix = "acq-deal-assumptions-table-wrapper";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <CardWithHeader
      title="Property Information"
      icon={<InformationCircleIcon />}
      bodyPadding={false}
      className={getClasses()}
      loaderKind="chart"
      {...props}
    >
      <TableCard.Body>
        <Table
          style={{
            tableLayout: "fixed",
          }}
        >
          <Table.Row>
            <Table.Header>Sub-Market</Table.Header>
            <Table.Data className="whitespace-normal">
              {genericGetValue(deal?.submarket)}
            </Table.Data>
            <Table.Header>Truck Court Depth</Table.Header>
            <Table.Data>{genericGetValue(deal?.truck_court_depth)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Year Built</Table.Header>
            <Table.Data>{genericGetValue(deal?.year_built)}</Table.Data>
            <Table.Header>Parking Spaces</Table.Header>
            <Table.Data>{readableNumber(deal?.parking_spaces)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Number of Buildings</Table.Header>
            <Table.Data>{readableNumber(deal?.number_of_buildings)}</Table.Data>
            <Table.Header>Parking Ratio</Table.Header>
            <Table.Data>{readableNumber(deal?.parking_ratio)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Number of Units</Table.Header>
            <Table.Data>{readableNumber(deal?.number_of_units)}</Table.Data>
            <Table.Header>Trailer Parking Spaces</Table.Header>
            <Table.Data>
              {genericGetValue(deal?.trailer_parking_spaces)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Site Area</Table.Header>
            <Table.Data>{readableNumber(deal?.site_area)}</Table.Data>
            <Table.Header>Office SF</Table.Header>
            <Table.Data>{readableNumber(deal?.office_sf)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Site Coverage</Table.Header>
            <Table.Data>{readableNumber(deal?.site_coverage)}</Table.Data>
            <Table.Header>Office Finish (%)</Table.Header>
            <Table.Data>{numberToPercent(deal?.office_finish)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Zoning</Table.Header>
            <Table.Data>{genericGetValue(deal?.zoning)}</Table.Data>
            <Table.Header>Mezzanine SF</Table.Header>
            <Table.Data>{readableNumber(deal?.mezzanine_sf)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Tax parcel</Table.Header>
            <Table.Data>{genericGetValue(deal?.tax_parcel)}</Table.Data>
            <Table.Header>Power Supply</Table.Header>
            <Table.Data>{genericGetValue(deal?.power_supply)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Clear Heights</Table.Header>
            <Table.Data>{genericGetValue(deal?.clear_heights)}</Table.Data>
            <Table.Header>Sprinkler System</Table.Header>
            <Table.Data>{genericGetValue(deal?.sprinkler_system)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Column Spacing</Table.Header>
            <Table.Data>{genericGetValue(deal?.column_spacing)}</Table.Data>
            <Table.Header>Lighting System</Table.Header>
            <Table.Data>{genericGetValue(deal?.lighting_system)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Dock High Doors</Table.Header>
            <Table.Data>{readableNumber(deal?.dock_high_doors)}</Table.Data>
            <Table.Header>Construction Type</Table.Header>
            <Table.Data>{genericGetValue(deal?.construction_type)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Drive-Ins</Table.Header>
            <Table.Data>{genericGetValue(deal?.drive_ins)}</Table.Data>
            <Table.Header>Roof Type</Table.Header>
            <Table.Data>{genericGetValue(deal?.roof_type)}</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Rail Doors</Table.Header>
            <Table.Data>{readableNumber(deal?.rail_doors)}</Table.Data>
            <Table.Header>Roof Installation Year</Table.Header>
            <Table.Data>
              {genericGetValue(deal?.roof_installation_year)}
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Header>Loading Type</Table.Header>
            <Table.Data>{genericGetValue(deal?.loading_type)}</Table.Data>
            <Table.Header>Roof Warranty Expiration</Table.Header>
            <Table.Data>
              {genericGetValue(deal?.roof_warranty_expiration)}
            </Table.Data>
          </Table.Row>
        </Table>
      </TableCard.Body>
    </CardWithHeader>
  );
};
