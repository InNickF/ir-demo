import { Head, HeadProps } from "@/commons/components/general/Head";
import { FC } from "react";

export const ToolsHead: FC<HeadProps> = ({ title, children, description }) => {
  const titleText = title ? `Tools | ${title}` : "Tools";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
