import { IImage } from "@/types/Image";
import { IMdcs } from "@/types/Mdcs";
import { IQaData } from "@/types/QaData";
import { IReceipt } from "@/types/Receipt";
import { Range } from "react-date-range";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IQaWorkStore {
  dateRange: Range;
  setDateRange: (dateRange: Range) => void;
  receiptsByDate: Record<string, IReceipt[]>;
  setReceiptsByDate: (newReceipts: Record<string, IReceipt[]>) => void;
  currentReceipt: IReceipt | null;
  setCurrentReceipt: (newCurrentReceipt: IReceipt) => void;
  images: IImage[];
  setImages: (newImages: IImage[]) => void;
  currentImage: IImage | null;
  setCurrentImage: (newCurrentImage: IImage) => void;
  mdcs: IMdcs[];
  setMdcs: (newMdcs: IMdcs[]) => void;
  qaData: IQaData[];
  setQaData: (newQaData: IQaData[]) => void;
  withImage: boolean;
  setWithImage: (withImage: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  mappedColors: string[];
}

export const useQaWorkStore = create(
  persist<IQaWorkStore>(
    (set) => ({
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
      mdcs: [],
      setMdcs: (mdcs) => set({ mdcs }),
      qaData: [],
      setQaData: (qaData) => set({ qaData }),
      withImage: true,
      setWithImage: (withImage) => set({ withImage }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
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
    }),
    {
      name: "qaWorkStore",
      getStorage: () => localStorage,
    }
  )
);
