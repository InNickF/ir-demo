import { FC } from "react";
import { Head, HeadProps } from "@/commons/components/general/Head";

export const AcqHead: FC<HeadProps> = ({ title, children, description }) => {
  const titleText = title ? `Acquisitions | ${title}` : "Acquisitions";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
