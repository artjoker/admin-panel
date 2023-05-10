export interface IPaginationDTO {
  page: number;
  perPage: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalPages: number;
}
