import { Head, HeadProps } from "@/commons/components/general/Head";
import { FC } from "react";

export const DebtHead: FC<HeadProps> = ({ title, children, description }) => {
  const titleText = title ? `Debt | ${title}` : "Debt";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
