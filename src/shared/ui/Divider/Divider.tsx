import { DividerProps } from 'antd';
import { StyledDivider } from './DividerStyles';

export type IDividerProps = DividerProps;

const Divider = (props: IDividerProps) => <StyledDivider {...props} />;

export default Divider;
