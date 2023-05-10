import { ResponseStatusCodes } from '@/constants/common';

export interface IApiError {
  status: ResponseStatusCodes;
  message: string;
  validationErrors?: any[];
}
