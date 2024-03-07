export interface IQaData {
  qaDataId: number;
  imageId: number;
  imageName: string;
  isMapping: boolean;
  isMultiMapping: boolean;
  clmInfoSeqNo: number[];
  dateFrom: string;
  isStandardEdi: boolean;
  treatmentCode: string;
  treatment: string;
  dateTo: string;
  ediCode: string;
  ediName: string;
  inferenceEdiName: string;
  price: number;
  cnt: number;
  term: number;
  total_price: number;
  all_selfpay: number;
  non_benefit: number;
  classOfMedicalExpense: "01" | "02";
}

export interface IQaDataSaveRequest
  extends Omit<
    IQaData,
    | "qaDataId"
    | "imageId"
    | "imageName"
    | "clmInfoSeqNo"
    | "isMapping"
    | "isMultiMapping"
    | "isStandardEdi"
    | "inferenceEdiName"
    | "all_selfpay"
    | "non_benefit"
  > {
  qaDataId?: number;
}

export interface IQaDataResponse {
  qaDataId: number;
  imageId: number;
  imageName: string;
  isMapping: boolean;
  isMultiMapping: boolean;
  clmInfoSeqNo: number[];
  dateFrom: string;
  isStandardEdi: boolean;
  treatmentCode: string;
  treatment: string;
  dateTo: string;
  ediCode: string;
  ediName: string;
  inferenceEdiName: string;
  price: number;
  cnt: number;
  term: number;
  total_price: number;
  all_selfpay: number;
  non_benefit: number;
  classOfMedicalExpense: "01" | "02";
}
