import { IsRefetchingProp } from "@/commons/typings";
import { CompstackCompsTableCardPropsBase } from "@/modules/acquisitions/components/data-display/compstack-comp-tables/types";
import { Deal } from "@/modules/acquisitions/typings/deals";

export interface DealMarketAnalyticsCompsProps
  extends CompstackCompsTableCardPropsBase,
    IsRefetchingProp {
  dealId: Deal["id"];
  headerActions?: React.ReactNode;
}
