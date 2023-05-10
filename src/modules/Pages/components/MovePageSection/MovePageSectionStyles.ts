import styled from 'styled-components';
import { Typography } from 'antd';

import { Button } from '@/ui';
import { COLORS } from '@/theme';

export const StyledMovePageSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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

export const StyledMoveToRoot = styled(Typography.Text)`
  cursor: pointer;
  color: ${COLORS.VIOLET_PRIMARY};
`;
