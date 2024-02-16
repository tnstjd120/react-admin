import { ReactNode, createContext, useContext, useState } from "react";

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

  withImage: boolean;
  handleChangeWithImage: (withImage: boolean) => void;

  mappedColors: string[];
}

const QaWorkContext = createContext<IQaWorkContext | null>(null);

export const useQaWorkContext = () => {
  const context = useContext(QaWorkContext);

  if (!context) throw new Error("useQaWorkContext is null");

  return context;
};

export const QaWorkProvider = ({ children }: { children: ReactNode }) => {
  const [receipts, setReceipts] = useState<string[]>([]);
  const [currentReceipt, setCurrentReceipt] = useState<{}>([]);
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<{}>({});
  const [exts, setExts] = useState<string[]>([]);
  const [qaData, setQaData] = useState<string[]>([]);

  const [withImage, setWithImage] = useState(true);
  const handleChangeWithImage = (withImage: boolean) => {
    setWithImage(withImage);
  };

  const mappedColors = [
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
  ];

  return (
    <QaWorkContext.Provider
      value={{
        receipts,
        setReceipts,
        currentReceipt,
        setCurrentReceipt,
        images,
        setImages,
        currentImage,
        setCurrentImage,
        exts,
        setExts,
        qaData,
        setQaData,
        withImage,
        handleChangeWithImage,
        mappedColors,
      }}
    >
      {children}
    </QaWorkContext.Provider>
  );
};
