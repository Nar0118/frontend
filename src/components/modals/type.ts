import { IDevice } from "../deviceItem/types";

export interface PropsType {
  show: boolean;
  onHide: (res?: any) => any;
  selectedDevice?: IDevice;
}

export type ActionType =
  | "id"
  | "name"
  | "description"
  | "price"
  | "rating"
  | "img"
  | "createdAt"
  | "updatedAt"
  | "typeId"
  | "brandId"
  | "type"
  | "brand"
  | "ratings";
