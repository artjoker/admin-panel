import styled from 'styled-components';
import { Space, Input } from 'antd';

import { Button } from '@/ui';

export const StyledButton = styled(Button)`
  font-size: 0.7rem !important;
  padding: 0.2rem 0.4rem !important;
  width: 5.5rem;
  height: 2rem !important;
`;

export const StyledDropdown = styled.div`
  padding: 0.5rem;
`;

export const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 0.5rem;

  & .ant-space-item {
    display: flex;
    align-items: center;
  }
`;
export const StyledInput = styled(Input)`` as typeof Input;
