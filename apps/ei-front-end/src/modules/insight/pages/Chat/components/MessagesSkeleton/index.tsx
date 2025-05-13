import { Skeleton } from "in-ui-react";
import { FC } from "react";

export const MessagesSkeleton: FC = () => {
  return (
    <Skeleton className="w-full max-w-screen-2xl">
      <Skeleton.Text className="w-full max-w-screen-2xl h-32 mb-4" rows={4} />
    </Skeleton>
  );
};
