import { FC } from "react";
import { Head, HeadProps } from "@/commons/components/general/Head";

export const LabHead: FC<HeadProps> = ({ title, children, description }) => {
  const titleText = title ? `Labs | ${title}` : "Labs";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
