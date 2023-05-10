import { FormItemProps } from 'antd';
import { StyledFormItem } from './FormItemStyles';

export type IFormItemProps = FormItemProps;

const FormItem = (props: IFormItemProps): JSX.Element => (
  <StyledFormItem {...props} />
);

export default FormItem;
