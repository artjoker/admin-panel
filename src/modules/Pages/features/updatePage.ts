import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PageAPI } from '@/api';
import { prepareMutation } from '@/utils';

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(PageAPI.updatePage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['pages']);
      queryClient.invalidateQueries(['single-page']);
    },
  });

  return prepareMutation('updatePage', mutation);
};
