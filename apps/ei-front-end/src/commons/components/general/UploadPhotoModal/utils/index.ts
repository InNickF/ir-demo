export const getFileName = ({ file }: { file: File }) => {
  return file ? file?.name?.replace(/\.[^/.]+$/, "") : "";
};

export const getNewFileRenamed = ({
  file,
  newFileName,
}: {
  file: File;
  newFileName: string;
}) => {
  const nameWithExtension =
    newFileName + file?.name?.slice(file?.name?.lastIndexOf("."));
  return new File([file], nameWithExtension, { type: file?.type });
};
