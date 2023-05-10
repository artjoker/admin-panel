import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserAPI } from '@/api';
import { prepareMutation } from '@/utils';

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(UserAPI.deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['found-users']);
    },
  });

  return prepareMutation('deleteUser', mutation);
};

export default useDeleteUser;
