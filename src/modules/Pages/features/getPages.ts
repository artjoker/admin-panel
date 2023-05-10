import { useQuery } from '@tanstack/react-query';

import { PageAPI } from '@/api';
import { prepareQueryResult } from '@/utils';

export const useGetPages = () => {
  const result = useQuery(['pages'], () => PageAPI.getPages());
  return prepareQueryResult('pages', result, []);
};
