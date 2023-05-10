import { ButtonProps } from 'antd';
import { StyledButton } from './ButtonStyles';

export type IButtonProps = ButtonProps;

const Button = (props: IButtonProps): JSX.Element => {
  return <StyledButton {...props} />;
};

export default Button;
