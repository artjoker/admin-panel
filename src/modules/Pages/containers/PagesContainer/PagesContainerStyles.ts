import styled from 'styled-components';
import { motion } from 'framer-motion';

import { SearchInput } from '@/components';
import { Button } from '@/ui';

import { PagesTree } from '../../components';

export const StyledPagesContainer = styled.div<{ isLoading: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 1rem;
  padding-top: ${({ isLoading }) => (isLoading ? '1.9rem' : '0.25rem')};
`;

export const StyledPagesTreeWrapper = styled.div`
  height: 100%;
  flex: 1;
`;

export const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 0.5rem;
`;

export const StyledPagesTree = styled(PagesTree)`
  margin-bottom: 1rem;
`;

export const StyledAddPageButton = styled(Button)`
  width: 14rem;
`;

export const StyledRightSectionWrapper = styled(motion.div)`
  flex: 1;
  min-height: 100vh;
`;

StyledRightSectionWrapper.defaultProps = {
  transition: { type: 'tween' },
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
};
