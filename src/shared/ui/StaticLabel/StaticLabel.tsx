import React, { ReactNode } from 'react';
import { StyledLabel, StyledWrapper } from './StaticLabelStyles';

interface IStaticLabel {
  id?: string;
  label: string;
  children: ReactNode;
  withPrefix?: boolean;
  withRequiredMark?: boolean;
}

const StaticLabel = ({
  id,
  label,
  children,
  withPrefix,
  withRequiredMark,
}: IStaticLabel) => {
  return (
    <StyledWrapper id={id}>
      {children}
      <StyledLabel $withPrefix={withPrefix}>
        {label}
        {!!withRequiredMark && <i>*</i>}
      </StyledLabel>
    </StyledWrapper>
  );
};

export default StaticLabel;
