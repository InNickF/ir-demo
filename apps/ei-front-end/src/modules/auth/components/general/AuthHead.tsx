import { FC } from "react";
import { Head, HeadProps } from "@/commons/components/general/Head";

export const AuthHead: FC<HeadProps> = ({ title, description, children }) => {
  const titleText = title ? `I.R  | ${title}` : "I.R ";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
