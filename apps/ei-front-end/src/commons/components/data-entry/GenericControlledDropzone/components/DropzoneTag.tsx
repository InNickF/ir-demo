import React, { FC } from "react";
import { Tag } from "in-ui-react";

export interface DropzoneTagProps {
  value: File | File[];
  onRemove: (arg: File) => void;
}

export const DropzoneTag: FC<DropzoneTagProps> = ({ value, onRemove }) => {
  if (Array.isArray(value)) {
    return (
      <>
        {value.map((file) => (
          <div className="mb-2" key={`${file.name}`}>
            <Tag
              textSliceLength={40}
              text={file.name}
              action={() => onRemove(file)}
            />
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {value ? (
        <div className="mb-2" key={`${value.name}`}>
          <Tag
            textSliceLength={40}
            text={value.name}
            action={() => onRemove(value)}
          />
        </div>
      ) : null}
    </>
  );
};
