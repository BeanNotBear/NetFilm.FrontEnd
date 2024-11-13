export interface PageResult<T>{
  items: T[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
