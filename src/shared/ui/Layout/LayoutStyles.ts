import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@/theme';

export const StyledLayout = styled(AntdLayout)`
  min-height: 100vh;
  background: ${COLORS.WHITE};
`;
