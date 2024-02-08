import { ReactNode } from "react";
import { TableProvider } from "./TableContext";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};

const CustomTable = ({ children }: Props) => {
  return (
    <TableProvider>
      <Box>{children}</Box>
    </TableProvider>
  );
};

export default CustomTable;
