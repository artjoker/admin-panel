import styled from 'styled-components';

import { Button } from '@/ui';
import { COLORS } from '../../../../shared/theme/theme';

export const StyledSortChildrenSection = styled.div`
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

export const PageList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PageItem = styled.div<{
  $isDragging?: boolean;
  $isOverlay?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.LIGHT_GRAY};
  padding: 0.5rem;
  padding-right: 0.75rem;
  cursor: grab;
  user-select: none;

  ${({ $isDragging }) => ($isDragging ? 'opacity: 0.25;' : '')}

  ${({ $isOverlay }) =>
    $isOverlay
      ? `
      cursor: grabbing;
      border: 1px solid ${COLORS.VIOLET_PRIMARY_ACTIVE};
      box-shadow:
        0px 12px 38px 3px #00000024,
        0px 5px 15px -7px #00000033;
    `
      : ''}

  svg {
    font-size: 1.25rem;
  }
`;

export const PageItemTitle = styled.div`
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const PageItemUrlSlug = styled.div``;
