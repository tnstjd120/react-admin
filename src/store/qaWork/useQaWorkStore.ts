import { Receipt } from "@/types/Receipt";
import { Range } from "react-date-range";
import { create } from "zustand";

interface IQaWorkContext {
  dateRange: Range;
  setDateRange: (dateRange: Range) => void;

  receiptsByDate: Record<string, Receipt[]>;
  setReceiptsByDate: (newReceipts: Record<string, Receipt[]>) => void;
  currentReceipt: {} | null;
  setCurrentReceipt: (newCurrentReceipt: {}) => void;

  images: string[];
  setImages: (newImages: string[]) => void;
  currentImage: {} | null;
  setCurrentImage: (newCurrentImage: {}) => void;

  exts: string[];
  setExts: (newExts: string[]) => void;

  qaData: string[];
  setQaData: (newQaData: string[]) => void;

  withImage: boolean;
  setWithImage: (withImage: boolean) => void;

  mappedColors: string[];
}

export const useQaWorkStore = create<IQaWorkContext>((set) => ({
  dateRange: { startDate: new Date(), endDate: new Date() },
  setDateRange: (dateRange) => set({ dateRange }),
  receiptsByDate: {},
  setReceiptsByDate: (receiptsByDate) => set({ receiptsByDate }),
  currentReceipt: null,
  setCurrentReceipt: (currentReceipt) => set({ currentReceipt }),
  images: [],
  setImages: (images) => set({ images }),
  currentImage: null,
  setCurrentImage: (currentImage) => set({ currentImage }),
  exts: [],
  setExts: (exts) => set({ exts }),
  qaData: [],
  setQaData: (qaData) => set({ qaData }),
  withImage: true,
  setWithImage: (withImage) => set({ withImage }),
  mappedColors: [
    "#f65b46",
    "#7863b2",
    "#4cd33c",
    "#18955d",
    "#2b4033",
    "#5ce6af",
    "#ff8043",
    "#071056",
    "#19b3cb",
    "#1d623e",
    "#1f526e",
    "#843198",
    "#a278e8",
    "#fd335e",
    "#fc4c94",
    "#cdaf3e",
    "#66425d",
    "#ef8fda",
    "#dee557",
    "#f14af2",
    "#b755f9",
    "#c88865",
    "#c6a8a0",
    "#fab9d2",
    "#8451a5",
    "#dec8b3",
    "#0cf3cf",
    "#ae09d9",
    "#fae14c",
    "#bd98c3",
    "#f65b46",
    "#7863b2",
    "#4cd33c",
    "#18955d",
    "#2b4033",
    "#5ce6af",
    "#ff8043",
    "#071056",
    "#19b3cb",
    "#1d623e",
    "#1f526e",
    "#843198",
    "#a278e8",
    "#fd335e",
    "#fc4c94",
    "#cdaf3e",
    "#66425d",
    "#ef8fda",
    "#dee557",
    "#f14af2",
    "#b755f9",
    "#c88865",
    "#c6a8a0",
    "#fab9d2",
    "#8451a5",
    "#dec8b3",
    "#0cf3cf",
    "#ae09d9",
    "#fae14c",
    "#bd98c3",
  ],
}));
