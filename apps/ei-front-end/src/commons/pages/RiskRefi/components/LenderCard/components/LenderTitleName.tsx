import { Tooltip } from "in-ui-react";
import { FC } from "react";
import "../styles.css";

interface LenderTitleNameProps {
  name: string;
}

export const LenderTitleName: FC<LenderTitleNameProps> = ({ name }) => {
  const maxNameLength = 25;

  const nameIsTooLong = name.length > maxNameLength;

  return nameIsTooLong ? (
    <Tooltip content={name}>
      <span className="debt-risk-refi-lender-card__lender-name">
        {`${name.slice(0, maxNameLength)}...`}
      </span>
    </Tooltip>
  ) : (
    <span className="debt-risk-refi-lender-card__lender-name">{name}</span>
  );
};
