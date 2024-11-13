import {NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";

export interface Dictionary {
  [key: string]: any
}

export enum COL_DATA_TYPE{
  TEXT = 0,
  NUMBER = 1,
  CURRENCY = 2,
  DATE = 3
}

export type SortOrder = NzTableSortOrder;
export type SortFunc = NzTableSortFn;
