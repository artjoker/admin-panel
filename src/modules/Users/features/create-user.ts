import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserAPI } from '@/api';
import { prepareMutation } from '@/utils';

const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(UserAPI.createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['found-users']);
    },
  });

  return prepareMutation('createUser', mutation);
};

export default useCreateUser;
