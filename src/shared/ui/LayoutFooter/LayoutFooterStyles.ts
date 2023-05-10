import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@/theme';

const { Footer } = AntdLayout;

export const StyledLayoutFooter = styled(Footer)`
  background: ${COLORS.WHITE};
`;
