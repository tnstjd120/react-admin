import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type NumberFloatTextFieldProps = {
  value: string | number;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => void;
} & Omit<TextFieldProps, "onChange" | "value">;

const NumberFloatTextField = ({
  value,
  onInputChange,
  ...props
}: NumberFloatTextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;

    const isValidNumber = /^(\d+\.?\d*)?$/.test(newValue);

    if (!isValidNumber) return;

    setInputValue(newValue);
    onInputChange(event, newValue);
  };

  return (
    <TextField
      {...props}
      value={inputValue}
      onChange={handleChange}
      inputProps={{
        ...props.inputProps,
        inputMode: "decimal",
      }}
    />
  );
};

export default NumberFloatTextField;
