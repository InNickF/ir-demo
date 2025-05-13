import { Presentation } from "@/investor/typings/presentations";
import { Card, Heading } from "in-ui-react";
import Link from "next/link";
import { FC } from "react";
import "./styles.css";

export const PresentationItem: FC<Omit<Presentation, "link">> = ({
  id,
  name,
}) => {
  return (
    <Link href={`/investor/presentation/?id=${id}`}>
      <a target="_blank">
        <Card className="investor-presentation-item">
          <Heading kind="h5">{name}</Heading>
        </Card>
      </a>
    </Link>
  );
};
