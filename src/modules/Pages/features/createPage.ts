import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PageAPI } from '@/api';
import { prepareMutation } from '@/utils';

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(PageAPI.createPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['pages']);
    },
  });

  return prepareMutation('createPage', mutation);
};
