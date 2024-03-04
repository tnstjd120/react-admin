type TValidationRoles = Record<string, (value: string) => boolean>;

export const validationRoles: TValidationRoles = {
  dateFrom: (value: string) => /^\d{0,8}$/.test(value),
  dateTo: (value: string) => /^\d{0,8}$/.test(value),
  ediCode: (value: string) => true,
  ediName: (value: string) => true,
  price: (value: string) => true,
  cnt: (value: string) => true,
  term: (value: string) => true,
  total_price: (value: string) => true,
};
