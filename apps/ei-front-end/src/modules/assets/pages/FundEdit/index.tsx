import { AssetHead } from "@/assets/components/general/AssetHead";
import { FundLayout } from "@/assets/layouts/FundLayout";
import { InAssetsPermissionsLayout } from "@/assets/layouts/InAssetsPermissionsLayout";
import { NextPageWithLayout } from "@/commons/typings";
import { ButtonGroup } from "in-ui-react";
import { ReactElement } from "react";
import { EditFundCriticalDates } from "./components/EditFundCriticalDates";
import { EditFundInformation } from "./components/EditFundInformation";
import { useButtonGroupFundEdit } from "./hooks/useButtonGroupFundEdit";

const FundEdit: NextPageWithLayout = () => {
  const {
    fundEditFilter,
    fundEditFilterItems,
    fundEditInformationClasses,
    fundEditCriticalDatesClasses,
  } = useButtonGroupFundEdit();

  return (
    <section className="grid grid-cols-1 gap-6">
      <div className="flex items-center justify-between">
        <ButtonGroup
          active={fundEditFilter}
          items={fundEditFilterItems}
          className="w-full md:w-auto"
        />
      </div>
      <div>
        <EditFundInformation className={fundEditInformationClasses} />
        <EditFundCriticalDates className={fundEditCriticalDatesClasses} />
      </div>
    </section>
  );
};

FundEdit.getLayout = (page: ReactElement) => {
  return (
    <InAssetsPermissionsLayout>
      <AssetHead title="Fund Edit" />
      <FundLayout>{page}</FundLayout>
    </InAssetsPermissionsLayout>
  );
};

export default FundEdit;
