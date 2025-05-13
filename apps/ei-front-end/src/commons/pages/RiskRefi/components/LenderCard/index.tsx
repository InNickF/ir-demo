import { FundLenderByLtv } from "@/modules/debt/typings/fund";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Card, CardProps, TitleWithIcon, useTheme } from "in-ui-react";
import { FC } from "react";

import { LenderBodyMetrics } from "./components/LenderBodyMetrics";
import { LenderTitleName } from "./components/LenderTitleName";
import "./styles.css";
import { lenderColorBasedOnMaturity } from "../../utils";

interface LenderCardProps extends CardProps {
  lender: FundLenderByLtv;
  className?: string;
}

export const LenderCard: FC<LenderCardProps> = ({
  lender,
  className,
  ...props
}) => {
  const { theme } = useTheme();

  const prefix = "debt-risk-refi-lender-card";

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(" ");
  };

  const getLenderBorderColor = () => {
    return {
      borderColor: lenderColorBasedOnMaturity(
        lender?.initial_maturity_date,
        theme.includes("dark")
      ),
    };
  };

  return (
    <Card style={getLenderBorderColor()} className={getClasses()} {...props}>
      <TitleWithIcon icon={<BuildingOfficeIcon />}>
        <LenderTitleName name={lender.loan_name} />
      </TitleWithIcon>
      <LenderBodyMetrics lender={lender} />
    </Card>
  );
};
