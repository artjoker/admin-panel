import { Layout } from 'antd';
import { StyledLayoutContent } from './LayoutContentStyles';

const { Content } = Layout;

type ILayoutContent = React.ComponentProps<typeof Content>;

const LayoutContent = (props: ILayoutContent) => (
  <StyledLayoutContent {...props} />
);

export default LayoutContent;
