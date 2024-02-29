import { formatNumberWithComma, formatNumberWithUncomma } from "@/utils/comma";
import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

type TNumberCommaTextField = {
  value: string | number;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
} & Omit<TextFieldProps, "onChange">;

const NumberCommaTextField = ({
  value,
  onInputChange,
  ...props
}: TNumberCommaTextField) => {
  const [inputValue, setInputValue] = useState(
    formatNumberWithComma(Number(value))
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = formatNumberWithUncomma(event.target.value);

    if (!isNaN(newValue)) {
      const formattedValue = formatNumberWithComma(newValue);

      setInputValue(formatNumberWithComma(newValue));
      onInputChange(event, formattedValue);
    }
  };

  return (
    <TextField
      size="small"
      onChange={handleChange}
      value={inputValue}
      {...props}
    />
  );
};

export default NumberCommaTextField;
