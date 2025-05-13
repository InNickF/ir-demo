import { Tooltip } from "in-ui-react";
import { FC } from "react";
import "./styles.css";

interface TruncatedTextProps {
  text: string;
  className?: string;
  maxLength?: number;
}

export const TruncatedText: FC<TruncatedTextProps> = ({
  text,
  className,
  maxLength,
}) => {
  const textShouldBeTruncated = text.length > maxLength;

  const getClasses = () => {
    const prefix = ["commons-truncated-text"];
    textShouldBeTruncated && prefix.push("commons-truncated-text");
    return prefix.join(" ");
  };

  return (
    <>
      {textShouldBeTruncated ? (
        <Tooltip content={text}>
          <p className={getClasses()}>{text}</p>
        </Tooltip>
      ) : (
        <p className={className}>{text}</p>
      )}
    </>
  );
};
