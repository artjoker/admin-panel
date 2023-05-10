import { SwitchProps } from 'antd';
import { StyledSwitch } from './SwitchStyles';

type ISwitch = SwitchProps;

const Switch = (props: ISwitch) => <StyledSwitch {...props} />;

export default Switch;
