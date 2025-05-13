import { axios, privateAxios } from "@/commons/services/clients";
import { PresignedUrl, PresignedUrlFields } from "@/commons/typings";

const s3EIAccounts = ["data"] as const;
const s3EIModules = ["acquisitions", "debt"] as const;

const s3EIPresignedURLsByModule: Record<typeof s3EIModules[number], string> = {
  acquisitions: "/acquisitions/files/presigned-url",
  debt: "/files/presigned-url",
} as const;

interface GetS3PresignedURLStringParams {
  module: typeof s3EIModules[number];
}
type GetS3PresignedURLStringFn = (
  params: GetS3PresignedURLStringParams
) => string;

const getS3PresignedURLString: GetS3PresignedURLStringFn = ({ module }) => {
  if (!s3EIModules.includes(module) || !module)
    throw Error("Invalid S3 module.");

  return s3EIPresignedURLsByModule[module];
};

interface GetS3PathPayloadParams {
  module: typeof s3EIModules[number];
  S3path: string;
}
type GetS3PathPayloadFn = (params: GetS3PathPayloadParams) => string;

const getS3PathPayload: GetS3PathPayloadFn = ({ module, S3path }) => {
  if (!s3EIModules.includes(module) || !module)
    throw Error("Invalid S3 module.");

  if (module === "acquisitions") return `private${S3path}`;

  return S3path;
};

interface IGetPresignedUrlParams {
  S3path: string;
  module: typeof s3EIModules[number];
  s3Account: typeof s3EIAccounts[number];
  fileType?: string;
}

type PresignedUrlGetter = (
  params: IGetPresignedUrlParams
) => Promise<PresignedUrl>;

const getAcquisitionsPresignedUrl: PresignedUrlGetter = async ({
  S3path,
  fileType = "",
}) => {
  try {
    const response = await privateAxios.post(
      "/acquisitions/files/presigned-url",
      {
        path: `private${S3path}`,
        file_type: fileType,
      }
    );
    return response.data as PresignedUrl;
  } catch {
    throw Error("Unable to get presigned url");
  }
};

const getPresignedUrl: PresignedUrlGetter = async ({
  S3path,
  fileType = "",
  module,
  s3Account,
}) => {
  if (!s3EIModules.includes(module) || !module)
    throw Error("Invalid S3 module.");

  const presignedModuleURL = s3Account
    ? `${getS3PresignedURLString({ module })}?account=${s3Account}`
    : getS3PresignedURLString({ module });

  try {
    const response = await privateAxios.post(presignedModuleURL, {
      path: getS3PathPayload({ module, S3path }),
      file_type: fileType,
    });
    return response.data as PresignedUrl;
  } catch {
    throw Error("Unable to get presigned url");
  }
};

interface IUploadFileToS3Params {
  url: PresignedUrl["url"];
  fields: PresignedUrlFields;
  file: File;
}

const uploadFileToS3 = async ({ url, fields, file }: IUploadFileToS3Params) => {
  const finalFields = { ...fields, file };

  try {
    await axios.post(url, finalFields, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    throw Error(`Unable to upload file (${file.name}) to S3`);
  }

  return fields as PresignedUrlFields;
};

const s3PresignedURLGetters: Record<
  typeof s3EIModules[number],
  PresignedUrlGetter
> = {
  acquisitions: getAcquisitionsPresignedUrl,
  debt: getPresignedUrl,
};

interface IUploadFileParams<TArgs extends Record<string, unknown>> {
  url: IGetPresignedUrlParams["S3path"];
  file: File;
  args: TArgs;
  module?: typeof s3EIModules[number];
  s3Account?: typeof s3EIAccounts[number];
}
export const uploadFile = async <TArgs extends Record<string, unknown>>({
  url,
  file,
  args,
  module = "acquisitions",
  s3Account = null,
}: IUploadFileParams<TArgs>) => {
  const presignedUrlGetter = s3PresignedURLGetters[module] || getPresignedUrl;

  const { url: presignedUrl, fields } = await presignedUrlGetter({
    S3path: url,
    fileType: file.type,
    module,
    s3Account,
  });
  const { key } = await uploadFileToS3({ url: presignedUrl, fields, file });

  return { ...args, key };
};
