import { FC, HTMLAttributes } from "react";
import sanitizeHtml from "sanitize-html";
import "./styles.css";
interface HTMLRendererProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
  options?: sanitizeHtml.IOptions;
}

export const HTMLRenderer: FC<HTMLRendererProps> = ({
  html,
  options,
  ...props
}) => {
  return (
    <div
      {...props}
      className="acq-html-renderer"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(html, {
          allowedAttributes: {
            "*": ["style"],
          },
          ...options,
        }),
      }}
    ></div>
  );
};
