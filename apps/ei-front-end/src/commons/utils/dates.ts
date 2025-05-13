import { genericNoDataText } from "../model-in/formatters/utils";
import { GenericSelectOptions } from "../typings";

export const remainingDaysFromToday = (date: Date) => {
  if (date && date instanceof Date && !isNaN(date.getTime())) {
    const today = new Date();
    const todayWithoutHours = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const isSameDay = date.getUTCDate() === todayWithoutHours.getUTCDate();
    if (isSameDay) return 0;

    const diff = date.getTime() - todayWithoutHours.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  }
  return genericNoDataText;
};

// This functions transforms a date to MM/DD/YYYY format
export const transformDateToString = (date: Date) => {
  if (date && date instanceof Date && !isNaN(date.getTime())) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const newDate = `${month}/${day}/${year}`;
    const isValidFormatRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (isValidFormatRegex.test(newDate)) return newDate;
  }
  return genericNoDataText;
};

export const transformDateToYYYYMMDD = (date: Date) => {
  if (date && date instanceof Date && !isNaN(date.getTime())) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const newDate = `${year}-${month}-${day}`;
    const isValidFormatRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (isValidFormatRegex.test(newDate)) return newDate;
  }
  return genericNoDataText;
};

export const transformInputDateToMMDDYYYY = (date: Date | string): string => {
  const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return regex.test(dateString);
  };

  if (typeof date === "string" && isValidDateFormat(date)) {
    return date;
  }

  if (typeof date === "string") {
    const [year, month, day] = date.split("-");
    const newDate = `${month}/${day}/${year}`;
    if (isValidDateFormat(newDate)) {
      return newDate;
    }
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const newDate = `${month}/${day}/${year}`;
    if (isValidDateFormat(newDate)) {
      return newDate;
    }
  }

  return null;
};

export const dateRegex =
  /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/?|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:(?:0?2)(\/?|-|\.)(?:29)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/?|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/gm;

export const getYearFromMMDDYYYY = (date: string): string => {
  if (!date) return null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [month, day, year] = date.split("/");
  return year;
};

export const yearQuarters: GenericSelectOptions[] = [
  { value: "Q1", label: "Q1" },
  { value: "Q2", label: "Q2" },
  { value: "Q3", label: "Q3" },
  { value: "Q4", label: "Q4" },
];

export const getYearsList = ({
  from,
  to,
  order = "desc",
}: {
  from: number | "today";
  to: number | "today";
  order?: "asc" | "desc";
}): GenericSelectOptions[] => {
  const currentYear = new Date().getFullYear();
  const start = from === "today" ? currentYear : from;
  const end = to === "today" ? currentYear : to;

  const years = Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    label: `${start + i}`,
  }));

  return order === "desc" ? years.reverse() : years;
};

export const getMonthsList = ({
  order = "desc",
}: {
  order?: "asc" | "desc";
}): GenericSelectOptions[] => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthsList = months.map((month, index) => ({
    value: index + 1,
    label: month,
  }));

  return order === "desc" ? monthsList.reverse() : monthsList;
};

/**
 * Pads (add) the date digits with a zero if the number is less than 10.
 */
export const padDateDigitsWithZero = (date: Date): string => {
  const padWithZero = (number: number): string => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const day = padWithZero(date.getDate());
  const month = padWithZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const getFirstDateOfYear = () => {
  const today = new Date();
  const year =
    today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  return new Date(year, 0, 1);
};

export const getLastDayOfLastMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth(), 0);
