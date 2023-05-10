import { useQuery } from '@tanstack/react-query';

import { PageAPI } from '@/api';
import { prepareQueryResult } from '@/utils';
import { IGetOnePageDTO } from '@/models/page.model';

export const useGetPageBySlug = (payload: IGetOnePageDTO) => {
  const result = useQuery(['single-page', payload.slug], () =>
    PageAPI.getPage(payload),
  );

  return prepareQueryResult('singlePage', result, null, true);
};
