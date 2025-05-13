import React, { FC, PropsWithChildren } from "react";

export const RenderInputsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center gap-1">{children}</div>;
};
