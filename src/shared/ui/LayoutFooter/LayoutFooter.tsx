import { Layout } from 'antd';
import { StyledLayoutFooter } from './LayoutFooterStyles';

const { Footer } = Layout;
type ILayoutFooter = React.ComponentProps<typeof Footer>;

const LayoutFooter = (props: ILayoutFooter) => (
  <StyledLayoutFooter {...props} />
);

export default LayoutFooter;
