import { FC } from "react";

interface EditPropertyBenchmarkProps {
  className?: string;
}

export const EditPropertyBenchmark: FC<EditPropertyBenchmarkProps> = ({
  className,
}) => {
  return <div className={className}>hi Property Benchmark</div>;
};
