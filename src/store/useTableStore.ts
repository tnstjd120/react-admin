import { create } from "zustand";

export type Order = "asc" | "desc";

export interface IUseTableStore {
  selected: string[];
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  search: string;
  loading: boolean;
  rows: any[];
  copyRows: any[];
  setSelected: (selectedRows: string[]) => void;
  setOrder: (order: Order) => void;
  setOrderBy: (columnId: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setSearch: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setRows: (rows: any[]) => void;
  setCopyRows: (rows: any[]) => void;
  initializeTable: (initializeRows: any[]) => void;
}

export const useTableStore = create<IUseTableStore>((set) => ({
  rows: [],
  copyRows: [],
  selected: [],
  order: "asc",
  orderBy: "",
  page: 0,
  rowsPerPage: 10,
  search: "",
  loading: false,
  setRows: (rows) => set({ rows }),
  setCopyRows: (copyRows) => set({ copyRows }),
  setSelected: (selected) => set({ selected }),
  setOrder: (order) => set({ order }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setSearch: (search) => set({ search }),
  setLoading: (loading) => set({ loading }),
  initializeTable: (initializeRows) =>
    set({
      rows: initializeRows,
      copyRows: initializeRows,
      selected: [],
      order: "asc",
      orderBy: "",
      page: 0,
      rowsPerPage: 10,
      search: "",
      loading: false,
    }),
}));
