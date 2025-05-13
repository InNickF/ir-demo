import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Label,
  LabelProps,
  Tooltip,
  UploadButton,
  UploadButtonProps,
  useUploadButtonState,
} from "in-ui-react";
import { forwardRef } from "react";

export interface DownloadUploadButtonProps
  extends Omit<UploadButtonProps, "state"> {
  downloadUrl?: string;
  uploadedAt?: string;
  label: string;
  labelProps: Omit<LabelProps, "children">;
}
export const DownloadUploadButton = forwardRef<
  HTMLInputElement,
  DownloadUploadButtonProps
>(
  (
    {
      downloadUrl,
      uploadedAt,
      label,
      labelProps = {
        className: "mb-1.5",
      },
      buttonProps = {
        icon: <ArrowUpTrayIcon />,
        kind: "outline",
        disabled: true,
      },
      ...props
    },
    ref
  ) => {
    const state = useUploadButtonState();
    return (
      <div>
        <Label {...labelProps}>{label}</Label>
        <div className="flex flex-wrap gap-2">
          <Tooltip
            content={
              <>
                <p>Download file</p>
                {uploadedAt ? <small>(Uploaded at: {uploadedAt})</small> : null}
              </>
            }
          >
            <Button
              as="a"
              className={!downloadUrl ? "hidden" : undefined}
              href={downloadUrl}
              target="_blank"
              onlyIcon
              kind="solid"
              disabled
              icon={<ArrowDownTrayIcon />}
            />
          </Tooltip>
          <UploadButton
            ref={ref}
            {...props}
            buttonProps={buttonProps}
            state={state}
          >
            Attach file to upload it
          </UploadButton>
        </div>
      </div>
    );
  }
);

DownloadUploadButton.displayName = "DownloadUploadButton";
