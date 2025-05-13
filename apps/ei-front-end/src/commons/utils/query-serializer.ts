import { GenericFilterPayload } from "@/commons/typings";

export const querySerializer = (
  data?: GenericFilterPayload,
  isFirst = true
): string => {
  if (!data) {
    return "";
  }

  const queryParams = Object.keys(data)
    .map((key) => {
      const value = data[key];

      if (value === undefined || value === null || value === "") {
        return "";
      }

      if (typeof value === "boolean") {
        return `${key}=${value}`;
      }

      if (Array.isArray(value)) {
        const values = value.filter(Boolean).join(",");
        return `${key}=${values}`;
      }

      if (typeof value === "object") {
        return querySerializer(value, false);
      }

      return `${key}=${value}`;
    })
    .filter(Boolean)
    .join("&");

  return isFirst ? `?${queryParams}` : queryParams;
};
