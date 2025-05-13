import { FC } from "react";
import { CurrentValueHeader } from "../../general/CurrentPercentageHeader";

interface CurrentValueChartHeaderProps {
  value?: string;
  headerActions?: JSX.Element;
}
export const CurrentValueChartHeader: FC<CurrentValueChartHeaderProps> = ({
  value,
  headerActions,
}) => {
  return (
    <div className="flex items-center gap-3">
      {value ? <CurrentValueHeader value={value} /> : null}
      {headerActions}
    </div>
  );
};
