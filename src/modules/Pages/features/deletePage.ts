import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PageAPI } from '@/api';
import { prepareMutation } from '@/utils';

export const useDeletePage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(PageAPI.deletePage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['pages']);
    },
  });

  return prepareMutation('deletePage', mutation);
};
