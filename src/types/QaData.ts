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
}
