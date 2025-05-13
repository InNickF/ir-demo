import { ValidationRule } from "react-hook-form";

export const required = (inputLabel: string = null) =>
  inputLabel ? `${inputLabel} is required.` : "This input is required.";

export const email = (): ValidationRule<RegExp> => ({
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: "Must be a valid email.",
});

export const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Must be at least ${length} characters.`,
});

export const maxLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Must be at most ${length} characters.`,
});

export const phoneNumber = (): ValidationRule<RegExp> => ({
  value: /^\d{3}-\d{3}-\d{4}$/,
  message: "Must be a valid phone number.",
});

export const onlyZipCode = (): ValidationRule<RegExp> => ({
  value: /^\d{5}(-\d{4})?$/,
  message: "Must be a valid zip code.",
});

export const ssn = (): ValidationRule<RegExp> => ({
  value: /^\d{3}-\d{2}-\d{4}$/,
  message: "Must be a valid SSN.",
});

export const onlyNumbers = (): ValidationRule<RegExp> => ({
  value: /^\d+$/,
  message: "Must be only numbers (without decimals).",
});

export const onlyNumberWithOptionalDecimals = (): ValidationRule<RegExp> => ({
  value: /^\d+(\.\d{1,2})?$/,
  message: "Must be only numbers (max two optional decimals).",
});

export const onlyNumbersWithOrWithoutDecimals = (): ValidationRule<RegExp> => ({
  value: /^\d+(\.\d+)?$/,
  message: "Must be only numbers (optional decimals).",
});

export const moreOrEqualToZero = (
  inputLabel: string = null
): ValidationRule<number> => ({
  value: 0,
  message: inputLabel
    ? `${inputLabel} must be equal to or greater than 0.`
    : "Must be equal to or greater than 0.",
});

export const lessOrEqualToOneHundred = (
  inputLabel: string = null
): ValidationRule<number> => ({
  value: 100,
  message: inputLabel
    ? `${inputLabel} must be equal to or less than 100.`
    : "Must be equal to or less than 100.",
});

export const minLatitude = (): ValidationRule<number> => ({
  value: -90,
  message: "Must be a valid latitude.",
});

export const maxLatitude = (): ValidationRule<number> => ({
  value: 90,
  message: "Must be a valid latitude.",
});

export const minLongitude = (): ValidationRule<number> => ({
  value: -180,
  message: "Must be a valid longitude.",
});

export const maxLongitude = (): ValidationRule<number> => ({
  value: 180,
  message: "Must be a valid longitude.",
});

export const passwordValidations = {
  min8Characters: (value: string) =>
    /^(?=.{8,})/.test(value) || "Must be at least eight characters.",
  atLeastOneUppercaseLetter: (value: string) =>
    /^(?=.*[A-Z])/.test(value) || "Must contain at least one uppercase letter.",
  atLeastOneLowercaseLetter: (value: string) =>
    /^(?=.*[a-z])/.test(value) || "Must contain at least one lowercase letter.",
  atLeastOneNumber: (value: string) =>
    /^(?=.*[0-9])/.test(value) || "Must contain at least one number.",
  atLeastOneSpecialCharacter: (value: string) =>
    /^(?=.*[!@#$%^&*])/.test(value) ||
    "Must contain at least one special character. (!@#$%^&*)",
};

export const onlyYears = (): ValidationRule<RegExp> => ({
  value: /^(19|20)\d{2}$/,
  message: "Must be a valid year.",
});

export const percentageWithTwoDecimals = (): ValidationRule<RegExp> => ({
  value: /^(100(\.0{1,2})?|(\d{1,2}(\.\d{1,2})?))$/,
  message: "Must be a valid percentage (Optional decimals).",
});

// must be MM/DD/YYYY and the first two digits of the year must be 18, 19, 20 or 21.
export const datePattern = (): ValidationRule<RegExp> => ({
  value: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(18|19|20|21)\d{2}$/,
  message: "Must be a valid date.",
});
