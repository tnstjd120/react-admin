export const formatNumberWithComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumberWithUncomma = (str: string): number => {
  return parseFloat(str.replace(/,/g, ""));
};
