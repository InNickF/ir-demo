import { Heading } from "in-ui-react";
import { FC } from "react";

export const PageHeading: FC = () => {
  return (
    <div>
      <Heading kind="h1">
        Welcome to I.R.&apos;s A.I. Analytics Assistant.
      </Heading>
      <p className="w-full lg:w-2/3 xl:w-1/2">
        This is an experimental feature. For now, we can interact with
        I.R.&apos;s market data, we have data from the markets and submarkets,
        with metrics like vacancy, market size, construction, absorption,
        deliveries or market rents.
      </p>
    </div>
  );
};
