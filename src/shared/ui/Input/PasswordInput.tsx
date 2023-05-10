import React from 'react';
import { InputProps } from 'antd';
import StaticLabel from '../StaticLabel/StaticLabel';
import { StyledPasswordInput } from './InputStyles';
export type TInputSize = 'default' | 'large';

export interface IInputProps extends Omit<InputProps, 'size'> {
  label: string;
  size?: TInputSize;
  withRequiredMark?: boolean;
}

const PasswordInput = ({
  label,
  prefix,
  value,
  size = 'default',
  id,
  withRequiredMark,
  ...props
}: IInputProps): JSX.Element => (
  <StaticLabel
    label={label}
    withPrefix={!!prefix}
    id={id}
    withRequiredMark={withRequiredMark}
  >
    <StyledPasswordInput
      {...props}
      value={value}
      prefix={prefix}
      $size={size}
    />
  </StaticLabel>
);

export default PasswordInput;
