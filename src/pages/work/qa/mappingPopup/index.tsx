import { useQaWorkPersistStore } from "@/store/qaWork/useQaWorkPersistStore";
import { IQaWorkStore, useQaWorkStore } from "@/store/qaWork/useQaWorkStore";
import { IImage } from "@/types/Image";
import { IMdcs } from "@/types/Mdcs";
import { IQaData } from "@/types/QaData";
import { IReceipt } from "@/types/Receipt";
import { isEqual } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";

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

  // useEffect(() => {
  //   console.log("currentReceipt", currentReceipt);
  // }, [currentReceipt]);

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  // useEffect(() => {
  //   console.log("currentImage", currentImage);
  // }, [currentImage]);

  // useEffect(() => {
  //   console.log("mdcs", mdcs);
  // }, [mdcs]);

  // useEffect(() => {
  //   console.log("qaData", qaData);
  // }, [qaData]);

  useEffect(() => {
    const qaWorkStore = JSON.parse(
      localStorage.getItem("qaWorkStore") as string
    );

    updateStates(qaWorkStore.state);

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
    if (
      newData.currentReceipt &&
      !isEqual(newData.currentReceipt, currentReceipt)
    ) {
      console.log("currentReceipt Changed");
      setCurrentReceipt(newData.currentReceipt);
    }

    if (newData.images && !isEqual(newData.images, images)) {
      console.log("images Changed");
      setImages(newData.images);
    }

    if (newData.currentImage && !isEqual(newData.currentImage, currentImage)) {
      console.log("currentImage Changed");
      setCurrentImage(newData.currentImage);
    }

    if (newData.qaData && !isEqual(newData.qaData, qaData)) {
      console.log("qaData Changed");
      setQaData(newData.qaData);
    }

    if (newData.mdcs && !isEqual(newData.mdcs, mdcs)) {
      console.log("mdcs Changed");
      setMdcs(newData.mdcs);
    }

    console.log("------------------------------------------------------------");
  };

  return <div></div>;
};

export default MappingPopup;
