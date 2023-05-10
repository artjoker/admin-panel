import React from 'react';
import { InputProps } from 'antd';
import { StyledInput } from './InputStyles';
import StaticLabel from '../StaticLabel/StaticLabel';

export type TInputSize = 'default' | 'large';

export interface IInputProps extends Omit<InputProps, 'size'> {
  label: string;
  size?: TInputSize;
  withRequiredMark?: boolean;
}

const Input = ({
  label,
  prefix,
  value,
  id,
  size = 'default',
  withRequiredMark,
  ...props
}: IInputProps): JSX.Element => (
  <StaticLabel
    label={label}
    withPrefix={!!prefix}
    id={id}
    withRequiredMark={withRequiredMark}
  >
    <StyledInput {...props} value={value} prefix={prefix} $size={size} />
  </StaticLabel>
);

export default Input;
