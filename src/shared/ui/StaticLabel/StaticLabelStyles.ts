import styled from 'styled-components';
import { COLORS, DEVICES, pickThemeFontStyles } from '@/theme';

export const StyledWrapper = styled.div`
  position: relative;
`;

export const StyledLabel = styled.label<{
  $withPrefix?: boolean;
}>`
  ${pickThemeFontStyles('12', '16', 'SEMI_BOLD')};
  top: 0.5rem;
  color: ${COLORS.DARKEST_GRAY};
  z-index: 3;
  position: absolute;
  pointer-events: none;
  left: ${({ $withPrefix }) => ($withPrefix ? '2.875rem' : '1rem')};

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
