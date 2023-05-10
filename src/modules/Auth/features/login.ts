import { useMutation } from '@tanstack/react-query';

import { prepareMutation } from '@/utils';
import { AuthAPI } from '@/api';

const useLogin = () => {
  const mutation = useMutation(AuthAPI.login);

  return prepareMutation('loginUser', mutation);
};

export default useLogin;
