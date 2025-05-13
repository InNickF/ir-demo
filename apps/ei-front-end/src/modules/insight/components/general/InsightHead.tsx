import { Head, HeadProps } from "@/commons/components/general/Head";
import { FC } from "react";

export const InsightHead: FC<HeadProps> = ({
  title,
  children,
  description,
}) => {
  const titleText = title ? `Insight | ${title}` : "Insight";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
