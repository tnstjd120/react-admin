import { ReactNode } from "react";
import { TableContext } from "./TableContext";
import { Box, useTheme } from "@mui/material";

type TableWrapperType = {
  children: ReactNode;
};

const TableWrapper = ({ children }: TableWrapperType) => {
  const theme = useTheme();

  return (
    <TableContext.Provider value={}>
      <Box>{children}</Box>
    </TableContext.Provider>
  );
};

export default TableWrapper;
