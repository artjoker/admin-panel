import { css, FlattenSimpleInterpolation } from 'styled-components';

import { FONT_SIZES, FONT_WEIGHTS } from './theme';

export const pickThemeFontSize = (size: keyof typeof FONT_SIZES): string =>
  FONT_SIZES[size];

export const pickThemeFontStyles = (
  size: keyof typeof FONT_SIZES,
  height: keyof typeof FONT_SIZES,
  weight: keyof typeof FONT_WEIGHTS = 'NORMAL',
): FlattenSimpleInterpolation => css`
  font-size: ${FONT_SIZES[size]};
  line-height: ${FONT_SIZES[height]};
  font-weight: ${FONT_WEIGHTS[weight]};
`;
