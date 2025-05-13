import { FC, HTMLAttributes } from "react";
import "./styles.css";

interface VideoLinesProps extends HTMLAttributes<HTMLVideoElement> {
  isDark?: boolean;
}
export const VideoLines: FC<VideoLinesProps> = ({
  isDark,
  className,
  ...props
}) => {
  const getClasses = () => {
    const classes = ["bg-video-lines"];
    !isDark && classes.push("bg-video-lines--light");
    className && classes.push(className);
    return classes.join(" ");
  };
  return (
    <div className={getClasses()}>
      <video
        autoPlay
        loop
        muted
        playsInline
        src={isDark ? "/login-bg-dark.mp4" : "/login-bg-light.mp4"}
        {...props}
      />
    </div>
  );
};
