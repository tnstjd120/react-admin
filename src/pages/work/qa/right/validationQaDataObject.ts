type TValidationRoles = Record<string, (value: string) => boolean>;

export const validationRoles: TValidationRoles = {
  dateFrom: (value: string) => /^.{8}$/.test(value),
};
