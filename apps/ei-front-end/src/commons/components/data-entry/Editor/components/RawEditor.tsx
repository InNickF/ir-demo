import { Skeleton, useTheme } from "in-ui-react";
import { Editor as TEditor } from "@tinymce/tinymce-react";

// TinyMCE so the global var exists
import tinymce from "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/tinymce-5/skin.min.css";

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/template";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";
import { FC, useState } from "react";

export type EditorProps = React.ComponentProps<typeof TEditor> & {
  hideLoading?: boolean;
  className?: string;
};
const RawEditor: FC<EditorProps> = ({
  hideLoading = false,
  className,
  ...props
}) => {
  tinymce;
  const { theme } = useTheme();
  const { init, onInit, ...rest } = props;
  const [isLoading, setIsLoading] = useState(!hideLoading);

  const getClasses = () => {
    const prefix = "ei-tiny-editor";
    const classes = [prefix];
    theme.includes("dark") && classes.push(`${prefix}--dark`);
    isLoading && classes.push(`${prefix}--loading`);
    className && classes.push(className);
    return classes.join(" ");
  };
  const editorHeight = 400;
  const skeletonClasses = `w-full h-[400px]`;

  return (
    <>
      <div className={getClasses()}>
        <TEditor
          onInit={(event, editor) => {
            onInit && onInit(event, editor);
            setIsLoading(false);
          }}
          init={{
            ...init,
            height: editorHeight,
            font_family_formats: "Sans=sans-serif;Serif=serif",
            // note that skin and content_css is disabled to avoid the normal
            // loading process and is instead loaded as a string via content_style
            skin: false,
            content_css: false,
            content_style:
              "body { font-family: sans-serif; } h1,h2,h3,h4,h5,h6{font-family: serif;}",
          }}
          {...rest}
        />
      </div>
      {isLoading ? (
        <Skeleton className={skeletonClasses}>
          <Skeleton.Avatar shape="squared" className={skeletonClasses} />
        </Skeleton>
      ) : null}
    </>
  );
};

export default RawEditor;
