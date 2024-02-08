import { ReactNode, createContext, useContext, useState } from "react";

export type Order = "asc" | "desc";

type TableContextType = {
  selected: string[];
  setSelected: (selectedRows: string[]) => void;
  order: Order;
  setOrder: (order: Order) => void;
  orderBy: string;
  setOrderBy: (columnId: string) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  search: string;
  setSearch: (query: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  rows: any;
  setRows: any;
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
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState([]);

  return (
    <TableContext.Provider
      value={{
        selected,
        setSelected,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        search,
        setSearch,
        loading,
        setLoading,
        rows,
        setRows,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
