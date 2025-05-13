import { FC } from "react";
import { Head, HeadProps } from "@/commons/components/general/Head";

export const DispositionsHead: FC<HeadProps> = ({
  title,
  children,
  description,
}) => {
  const titleText = title ? `Dispositions | ${title}` : "Dispositions";
  return (
    <Head title={titleText} description={description}>
      {children}
    </Head>
  );
};
