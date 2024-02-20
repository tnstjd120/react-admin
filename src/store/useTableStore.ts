import { create } from "zustand";

export type Order = "asc" | "desc";

export interface IUseTableStore {
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
  rows: any[];
  setRows: (rows: any[]) => void;
  initializeTable: (initializeRows: any[]) => void;
}

export const useTableStore = create<IUseTableStore>((set) => ({
  rows: [],
  selected: [],
  order: "asc",
  orderBy: "",
  page: 0,
  rowsPerPage: 10,
  search: "",
  loading: false,
  setRows: (rows) => set({ rows }),
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
      selected: [],
      order: "asc",
      orderBy: "",
      page: 0,
      rowsPerPage: 10,
      search: "",
      loading: false,
    }),
}));
