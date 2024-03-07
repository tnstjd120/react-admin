import { Chip, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IMappedChip {
  label?: ReactNode;
  mappedColor: string;
  multiMapped?: boolean;
  position?: string;
}
export const MappedChip = (props: IMappedChip) => {
  const {
    label,
    mappedColor,
    position = "static",
    multiMapped = false,
  } = props;
  const theme = useTheme();

  const multiMappedStyles = multiMapped
    ? {
        padding: 0,
        width: "32px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",

        "& svg": {
          color: theme.palette.text.primary,
          width: 20,
          height: 20,
        },
      }
    : {};

  return (
    <Chip
      variant="outlined"
      label={label}
      sx={{
        position: position,
        left: "10px",
        top: "10px",
        backgroundColor: theme.palette.background.paper,
        borderWidth: "3px",
        borderRadius: "4px",
        borderColor: mappedColor,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,

        "& .MuiChip-label": {
          padding: "0 10px",
          ...multiMappedStyles,
        },
      }}
    />
  );
};
