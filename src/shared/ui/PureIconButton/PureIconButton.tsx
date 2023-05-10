import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledIconButton } from './PureIconButtonStyled';

interface IPureIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const PureIconButton = ({ children, className, ...props }: IPureIconButton) => (
  <StyledIconButton
    {...props}
    type="button"
    className={`ui-pure-icon-button ${className || ''}`}
  >
    {children}
  </StyledIconButton>
);

export default PureIconButton;
