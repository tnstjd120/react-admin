import { formatNumberWithComma, formatNumberWithUncomma } from "@/utils/comma";
import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

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
      setInputValue(formatNumberWithComma(newValue));
      onInputChange(event, inputValue);
    }
  };

  return (
    <TextField
      size="small"
      value={inputValue}
      onChange={handleChange}
      {...props}
    />
  );
};

export default NumberCommaTextField;
