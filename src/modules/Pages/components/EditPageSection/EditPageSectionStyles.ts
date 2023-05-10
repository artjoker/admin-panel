import styled from 'styled-components';

import { Form } from '@/components';
import { Button, Divider } from '@/ui';

export const StyledEditPageSection = styled.div``;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;

  & .ant-form-item {
    margin: 0;
  }
`;

export const StyledFormItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
  overflow: auto;
`;

export const StyledDivider = styled(Divider)`
  margin: 0;
  padding: 0;
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

export const StyledButton = styled(Button)`
  width: 7rem;
`;
