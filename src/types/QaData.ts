export interface IQaData {
  qaDataId: number;
  imageId: number;
  imageName: string;
  isMapping: true;
  isMultiMapping: true;
  clmInfoSeqNo: number[];
  dateFrom: string;
  isStandardEdi: true;
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
