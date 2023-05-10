import styled from 'styled-components';

import { Button, Menu } from '@/ui';
import { COLORS } from '@/theme';

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const NavMenu = styled(Menu)`
  border: none;
  width: 100%;
  flex-grow: 1;
  .ant-menu-item {
    margin-right: 24px;
  }
`;
export const LanguageMenu = styled.div`
  .ant-select-selection-item,
  .ant-select-arrow {
    color: ${COLORS.WHITE} !important;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 20px;
  width: 130px;
`;
