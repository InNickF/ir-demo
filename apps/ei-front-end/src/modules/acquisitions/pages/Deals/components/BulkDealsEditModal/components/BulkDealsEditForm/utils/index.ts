import { Deal } from "@/modules/acquisitions/typings/deals";

export const cleanEmptyObjectKeys = (obj: Partial<Deal>) => {
  const newObj: Partial<Deal> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
