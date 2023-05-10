import styled from 'styled-components';

import { FormItem } from '@/components';

export const StyledLoginForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 50%;

  .ant-form-item {
    width: 25rem;
  }
`;

export const StyledLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

export const StyledRememberContainer = styled(FormItem)`
  .ant-form-item-row {
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;
    justify-content: start;
    align-items: center;
  }
  .ant-form-item-label {
    padding: 0px;
  }
  .ant-form-item-control-input-content,
  .ant-form-item-control {
    width: fit-content !important;
    flex: initial;
  }
`;
export const StyledTitle = styled.h1`
  font-size: 2rem;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
