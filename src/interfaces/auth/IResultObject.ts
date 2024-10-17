export interface IResultObject<TResponseData> {
  errors?: string[];
  type?: string;
  detail?: string;
  data?: TResponseData;
}
