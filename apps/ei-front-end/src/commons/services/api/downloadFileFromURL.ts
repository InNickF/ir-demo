import axios from "axios";

interface IDownloadExcelFileFromURLParams {
  url: string;
  fileName?: string;
  contentType?: string;
}

export const downloadFileFromURL = async ({
  url,
  fileName = "spreadsheet.xlsx",
  contentType = "application/vnd.ms-excel",
}: IDownloadExcelFileFromURLParams) => {
  try {
    await axios
      .get(url, {
        headers: { "Content-Type": contentType },
        responseType: "blob",
      })
      .then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  } catch (e) {
    console.error(e);
    throw Error(`Unable to download file ${fileName}`);
  }
};
