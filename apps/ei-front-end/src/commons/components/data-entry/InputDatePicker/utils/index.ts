const regexMMDDYYYY =
  /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

export const transformDateToDatePicker = ({
  value,
  customFormat = regexMMDDYYYY,
}: {
  value: string;
  customFormat?: RegExp;
}): string => {
  const formatValidation = customFormat.test(value);
  const transformDate = (date: string) => {
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };
  const date = formatValidation ? transformDate(value) : value;

  return date;
};
