import { Loader } from "in-ui-react";
import { FC } from "react";

export const FullscreenLoader: FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
};
