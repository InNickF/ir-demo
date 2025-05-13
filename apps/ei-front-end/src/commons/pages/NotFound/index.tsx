import Link from "next/link";
import { Button, Heading } from "in-ui-react";
import Lines from "@/commons/components/decoration/Lines";
import "./styles.css";

const NotFound = () => {
  return (
    <>
      <Lines />
      <section className="not-found__page">
        <div>
          <Heading kind="display">404</Heading>
          <Heading kind="subtitle-1">
            Sorry, this page could not be found.
          </Heading>
        </div>
        <Link href="/" passHref>
          <Button as="a">Go to lobby</Button>
        </Link>
      </section>
    </>
  );
};

export default NotFound;
