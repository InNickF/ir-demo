import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import {
  Dropzone,
  DropzoneProps,
  Tag,
} from "../../../../../packages/in-ui-react/src/lib";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default {
  title: "Component/Dropzone",
  component: Dropzone,
} as ComponentMeta<typeof Dropzone>;

const Template: ComponentStory<typeof Dropzone> = (args) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const deleteFile = (id?: string) => {
    const newFiles = files?.filter((_, index) => index !== Number(id));
    setFiles(newFiles);
  };
  return (
    <Dropzone options={{ onDrop, multiple: true }}>
      {(dropzoneState) => {
        return (
          <div style={{ marginTop: "24px" }}>
            {files.length
              ? files?.map((file: File, index) => (
                  <Tag
                    key={`${file?.name}-${index}`}
                    id={`${index}`}
                    text={file?.name}
                    icon={<XMarkIcon />}
                    action={deleteFile}
                  />
                ))
              : null}
            {dropzoneState.isFocused ? (
              <p style={{ marginTop: "24px" }}>
                Is focussed (State from dropzone)
              </p>
            ) : (
              <p style={{ marginTop: "24px" }}>
                Is not Focused (State from dropzone)
              </p>
            )}
          </div>
        );
      }}
    </Dropzone>
  );
};

export const Default = Template.bind({});
Default.args = {} as DropzoneProps;
