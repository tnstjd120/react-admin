import { IReceipt } from "@/types/Receipt";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IQaWorkStore } from "./useQaWorkStore";

interface IQaWorkPersistStore
  extends Pick<
    IQaWorkStore,
    | "currentReceipt"
    | "setCurrentReceipt"
    | "images"
    | "setImages"
    | "currentImage"
    | "setCurrentImage"
    | "mdcs"
    | "setMdcs"
    | "qaData"
    | "setQaData"
    | "mappedColors"
  > {}

export const useQaWorkPersistStore = create(
  persist<IQaWorkPersistStore>(
    (set) => ({
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
      name: "qaWorkStorage",
      getStorage: () => localStorage,
    }
  )
);
