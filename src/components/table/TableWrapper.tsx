import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { TableProvider } from "./TableContext";

type TableWrapperType = {
  children: ReactNode;
};

const TableWrapper = ({ children }: TableWrapperType) => {
  const theme = useTheme();

  return (
    <TableProvider>
      <Box>{children}</Box>
    </TableProvider>
  );
};

export default TableWrapper;
