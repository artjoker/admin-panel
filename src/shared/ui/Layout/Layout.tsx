import { LayoutProps } from 'antd';
import { StyledLayout } from './LayoutStyles';

type ILayout = LayoutProps;

const Layout = (props: ILayout) => <StyledLayout {...props} />;

export default Layout;
