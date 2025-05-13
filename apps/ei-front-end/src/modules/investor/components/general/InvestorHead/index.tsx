import { Head, HeadProps } from "@/commons/components/general/Head";
import { FC } from "react";

export const InvestorHead: FC<HeadProps> = ({
  title,
  children,
  description,
}) => {
  const titleText = title ? `Investor | ${title}` : "Investor";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
