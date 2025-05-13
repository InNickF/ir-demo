import React, { FC } from "react";
import { Button, Card, Heading, Tooltip } from "in-ui-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./styles.css";

type LocalDealPhotosCardProps =
  | {
      file: File;
      removable: boolean;
      onRemove?: (file: File) => void;
    }
  | {
      file: File;
      removable: never;
      onRemove: never;
    };

export const LocalDealPhotosCard: FC<LocalDealPhotosCardProps> = ({
  file,
  onRemove = null,
  removable = false,
}) => {
  const getFileName = () => {
    if (file) {
      return file.name.length > 19
        ? `${file.name.substring(0, 20)}...`
        : file.name;
    }
    return "Untitled";
  };

  const fileName = getFileName();

  return (
    <Card className="acq-local-deal__photo-card">
      <div className="acq-local-deal__photo-card-header">
        <Heading kind="h5">{fileName}</Heading>
        {removable ? (
          <Tooltip content="Delete">
            <Button onlyIcon icon={<XMarkIcon />} kind="ghost" disabled />
          </Tooltip>
        ) : null}
      </div>
      <div className="acq-local-deal__photo-card-body">
        <img src={URL.createObjectURL(file)} alt={fileName} />
      </div>
    </Card>
  );
};
