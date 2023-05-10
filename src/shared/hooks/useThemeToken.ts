import { theme } from 'antd';

const { useToken } = theme;

const useThemeToken = () => {
  const { token } = useToken();

  return token;
};

export default useThemeToken;
