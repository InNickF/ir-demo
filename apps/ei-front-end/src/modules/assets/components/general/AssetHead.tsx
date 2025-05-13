import { FC } from "react";
import { Head, HeadProps } from "@/commons/components/general/Head";

export const AssetHead: FC<HeadProps> = ({ title, children, description }) => {
  const titleText = title ? `Assets | ${title}` : "Assets";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
