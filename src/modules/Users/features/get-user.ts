import { useQuery } from '@tanstack/react-query';

import { UserAPI } from '@/api';
import { prepareQueryResult } from '@/utils';
import { IUser } from '@/models/user.model';

const useGetUser = (
  userId?: string | null,
  options: {
    onSuccess?: (user: IUser) => void;
    onError?: (error: unknown) => void;
  } = {},
) => {
  const result = useQuery(
    ['user', userId],
    () => (userId ? UserAPI.getUser(userId) : null),
    {
      ...options,
    },
  );
  return prepareQueryResult('user', result, null, true);
};

export default useGetUser;
