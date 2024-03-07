type TReturnValidation = {
  validation: boolean;
  isValidationError: boolean;
  message: string;
};
type TValidationRoles = Record<string, (value: string) => TReturnValidation>;

export const validationRoles: TValidationRoles = {
  classOfMedicalExpense: (value: string) => {
    return {
      validation: value === "01" || value === "02",
      isValidationError: !(value === "01" || value === "02"),
      message: "비급여와 전액본인부담금 중 선택해주세요.",
    };
  },
  treatment: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  treatmentCode: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  dateFrom: (value: string) => {
    return {
      validation: /^\d{0,8}$/.test(value),
      isValidationError: !/^\d{8}$/.test(value),
      message: "8자리 숫자만 입력 가능합니다.",
    };
  },
  dateTo: (value: string) => {
    return {
      validation: /^\d{0,8}$/.test(value),
      isValidationError: !/^(|\d{8})$/.test(value),
      message: "8자리 숫자 or 빈 값만 입력 가능합니다.",
    };
  },
  ediCode: (value: string) => {
    return {
      validation: /^[a-zA-Z0-9]*$/.test(value),
      isValidationError: !/^(|\d{8})$/.test(value),
      message: "영문자와 숫자만 입력 가능합니다.",
    };
  },
  ediName: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  price: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  cnt: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  term: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
  total_price: (value: string) => {
    return { validation: true, isValidationError: true, message: "" };
  },
};
