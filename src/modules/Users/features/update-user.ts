import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserAPI } from '@/api';
import { prepareMutation } from '@/utils';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(UserAPI.updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['found-users']);
      queryClient.invalidateQueries(['user']);
    },
  });

  return prepareMutation('updateUser', mutation);
};

export default useUpdateUser;
