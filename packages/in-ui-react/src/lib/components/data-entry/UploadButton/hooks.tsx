import { useState } from "react";

export type UploadButtonState = {
  /**
   * Files array.
   */
  files: File[];
  /**
   * Set files.
   */
  setFiles: (files: File[]) => void;
};

export const useUploadButtonState = (): UploadButtonState => {
  const [files, setFiles] = useState<File[]>([]);
  const uploadButtonState: UploadButtonState = {
    files: files,
    setFiles: setFiles,
  };
  return uploadButtonState;
};
