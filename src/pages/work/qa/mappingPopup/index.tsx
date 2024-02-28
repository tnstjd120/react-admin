import { IQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IImage } from "@/types/Image";
import { IMdcs } from "@/types/Mdcs";
import { IQaData } from "@/types/QaData";
import { IReceipt } from "@/types/Receipt";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

interface QaWorkStoreOnlyData
  extends Omit<
    IQaWorkStore,
    | "setDateRange"
    | "setReceiptsByDate"
    | "setCurrentReceipt"
    | "setImages"
    | "setCurrentImage"
    | "setMdcs"
    | "setQaData"
    | "setWithImage"
  > {}

const MappingPopup = () => {
  const [currentReceipt, setCurrentReceipt] = useState<IReceipt | null>(null);
  const [images, setImages] = useState<IImage[]>([]);
  const [currentImage, setCurrentImage] = useState<IImage | null>(null);
  const [mdcs, setMdcs] = useState<IMdcs[]>([]);
  const [qaData, setQaData] = useState<IQaData[]>([]);

  useEffect(() => {
    const onSyncQaWorkStore = (event: StorageEvent) => {
      if (event.key === "qaWorkStore") {
        const newData = JSON.parse(event.newValue as string);

        updateStates(newData.state);
      }
    };

    window.addEventListener("storage", onSyncQaWorkStore);

    return () => {
      window.removeEventListener("storage", onSyncQaWorkStore);
    };
  }, []);

  const updateStates = (newData: QaWorkStoreOnlyData) => {
    setCurrentReceipt((prevData) => {
      return isEqual(newData.currentReceipt, prevData)
        ? prevData
        : newData.currentReceipt;
    });

    setImages((prevData) => {
      return isEqual(newData.images, prevData) ? prevData : newData.images;
    });

    setCurrentImage((prevData) => {
      return isEqual(newData.currentImage, prevData)
        ? prevData
        : newData.currentImage;
    });

    setMdcs((prevData) => {
      return isEqual(newData.mdcs, prevData) ? prevData : newData.mdcs;
    });

    setQaData((prevData) => {
      return isEqual(newData.qaData, prevData) ? prevData : newData.qaData;
    });
  };

  return <div></div>;
};

export default MappingPopup;
