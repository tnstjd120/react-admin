import { createContext, useContext } from "react";

interface IQaWorkContext {
  receipts: string[];
  setReceipts: (newReceipts: string[]) => void;
  currentReceipt: {};
  setCurrentReceipt: (newCurrentReceipt: {}) => void;

  images: string[];
  setImages: (newImages: string[]) => void;
  currentImage: {};
  setCurrentImage: (newCurrentImage: {}) => void;

  exts: string[];
  setExts: (newExts: string[]) => void;
  qaData: string[];
  setQaData: (newQaData: string[]) => void;
}

const QaWorkContext = createContext<IQaWorkContext | null>(null);

export const useQaWorkContext = () => {
  const context = useContext(QaWorkContext);

  if (!context) throw new Error("useQaWorkContext is null");

  return context;
};
