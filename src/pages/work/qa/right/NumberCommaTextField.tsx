import { formatNumberWithComma, formatNumberWithUncomma } from "@/utils/comma";
import { TextField } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";

type TNumberCommaTextField = {
  value: string | number;
  onInputChange: (value: string) => void;
};

const NumberCommaTextField = ({
  value,
  onInputChange,
}: TNumberCommaTextField) => {
  const [inputValue, setInputValue] = useState(
    formatNumberWithComma(Number(value))
  );

  useEffect(() => {
    onInputChange(inputValue);
  }, [inputValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = formatNumberWithUncomma(event.target.value);

    if (!isNaN(newValue)) {
      setInputValue(formatNumberWithComma(newValue));
    }
  };

  return <TextField size="small" value={inputValue} onChange={handleChange} />;
};

export default NumberCommaTextField;
