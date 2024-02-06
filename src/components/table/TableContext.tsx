import { ReactNode, createContext, useContext, useState } from "react";

type TableContextType = {
  selectedRows: string[];
  setSelectedRows: (selectedRows: string[]) => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
  orderBy: string;
  setOrderBy: (columnId: string) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) throw new Error("useTable is null");

  return context;
};

type TableProviderType = {
  children: ReactNode;
};

export const TableProvider = ({ children }: TableProviderType) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <TableContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        searchQuery,
        setSearchQuery,
        loading,
        setLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
