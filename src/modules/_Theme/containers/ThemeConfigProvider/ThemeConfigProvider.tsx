import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { theme } from '../../helpers';

interface IThemeContextProvider {
  children: ReactNode;
}

const ThemeConfigProvider = ({ children }: IThemeContextProvider) => (
  <ConfigProvider theme={theme}>{children}</ConfigProvider>
);

export default ThemeConfigProvider;
