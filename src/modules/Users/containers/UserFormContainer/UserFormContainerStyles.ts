import styled from 'styled-components';

import { Form, FormItem } from '@/components';
import { COLORS } from '@/theme';
import { Button, Divider } from '@/ui';

export const StyledUserFormWrapper = styled.div`
  height: 100%;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled(Button)`
  width: 7rem;
`;

export const StyledPasswordButton = styled(Button)`
  width: 100%;
  margin: 0 0 1rem;
`;

export const StyledDivider = styled(Divider)`
  margin: 0 0 1.5rem;
  padding: 0;
`;

export const StyledDeleteButton = styled(StyledButton)`
  background: ${COLORS.RED};
  &:hover {
    background: ${COLORS.RED_HOVER} !important;
  }
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const StyledSwitchLabel = styled.label`
  margin-left: 1rem;
  font-size: 1rem !important;
  font-weight: 500;
  line-height: 25px;
  height: 100%;
`;

export const StyledSwitchFormItem = styled(FormItem)`
  margin-top: auto;
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }
`;
