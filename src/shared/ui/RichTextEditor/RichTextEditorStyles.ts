import styled from 'styled-components';
import { COLORS, DEVICES, pickThemeFontStyles } from '@/theme';

export const StyledWrapper = styled.div`
  position: relative;
  padding-top: 1.5rem;
`;

export const StyledLabel = styled.label`
  ${pickThemeFontStyles('12', '16', 'SEMI_BOLD')};
  top: 0;
  color: ${COLORS.DARKEST_GRAY};
  z-index: 3;
  position: absolute;
  pointer-events: none;

  & > i {
    ${pickThemeFontStyles('18', '16')};
    color: ${COLORS.RED};
    padding-left: 0.25rem;
    font-style: normal;
    vertical-align: top;
  }

  @media screen and ${DEVICES.LAPTOP_S} {
    ${pickThemeFontStyles('14', '16', 'SEMI_BOLD')};
  }
`;
