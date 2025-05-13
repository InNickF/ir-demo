import { useDeals } from "@/modules/acquisitions/services/queries/deals";
import { Select } from "in-ui-react";
import { useAtom } from "jotai";
import { FC } from "react";
import { bulkEditDealsAtom } from "../../../../../../store/bulk-edit";
import { Deal } from "@/modules/acquisitions/typings/deals";
import "./styles.css";

interface BulkDealsSelectProps {
  className?: string;
}
export const BulkDealsSelect: FC<BulkDealsSelectProps> = ({ className }) => {
  const [preselectedDeals, setPreselectedDeals] = useAtom(bulkEditDealsAtom);
  const { data, isLoading } = useDeals({
    page_size: "-1",
  });

  const dealOptions = data?.results || [];

  const getClasses = () => {
    const classes = ["acq-bulk-deals-select"];
    className && classes.push(className);
    return classes.join(" ");
  };

  return (
    <Select
      label="Deals selected"
      tooltip={
        <p>
          All of the deals in this list will be <br />
          affected by your changes below.
        </p>
      }
      className={getClasses()}
      options={dealOptions}
      isMulti
      defaultValue={preselectedDeals}
      getOptionLabel={(option) => option.address}
      getOptionValue={(option) => option.id}
      onChange={(options: Deal[]) => {
        setPreselectedDeals(options);
      }}
      loading={isLoading}
      menuPortalTarget={document.body}
    />
  );
};
