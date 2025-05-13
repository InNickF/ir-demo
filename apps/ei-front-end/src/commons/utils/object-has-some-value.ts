// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectWithSomeValueOrNull = <T extends Record<any, any>>(
  object: T | null
): T | null => {
  if (!object) return null;

  const hasValue = Object.keys(object).some((key) => {
    const value = object[key];
    if (typeof value === "object" && value !== null) {
      return objectWithSomeValueOrNull(value) !== null;
    }
    return value !== undefined && value !== "";
  });

  return hasValue ? object : null;
};
