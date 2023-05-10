import { Layout } from 'antd';
import { StyledLayoutHeader } from './LayoutHeaderStyles';

const { Header } = Layout;
type ILayoutHeader = React.ComponentProps<typeof Header>;

const LayoutHeader = (props: ILayoutHeader) => (
  <StyledLayoutHeader {...props} />
);

export default LayoutHeader;
