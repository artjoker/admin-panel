import styled, { css } from 'styled-components';
import { Select } from 'antd';
import {
  COLORS,
  DEVICES,
  pickThemeFontSize,
  pickThemeFontStyles,
} from '@/theme';

export const StyledWrapper = styled.div`
  position: relative;
`;

export const StyledPrefix = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${pickThemeFontSize('20')};
  color: ${COLORS.DARKEST_GRAY};
  margin: 0;
  padding: 0 0.625rem 0 1rem;
  z-index: 1;
`;

const arrowStyles = css`
  .ant-select-arrow .anticon:not(.ant-select-suffix) {
    pointer-events: none;
  }

  &.ant-select-open .ant-select-arrow {
    transform: rotate(-180deg) translateY(50%);
  }

  .ant-select-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.24s;
    color: ${COLORS.DARKEST_GRAY};
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    top: 50%;
    transform-origin: center;
    transform: translateY(-50%);
  }

  .ant-select-clear {
    width: 1.5rem;
    height: 1.5rem;
    font-size: ${pickThemeFontSize('16')};
    margin-top: -0.5rem;
    background: ${COLORS.LIGHTEST_GRAY};
  }
`;

const selectStyles = css`
  &.ant-select {
    &-single {
      & .ant-select-selector {
        &,
        & .ant-select-selection-item,
        & .ant-select-selection-placeholder {
          ${pickThemeFontStyles('14', '20')};
        }

        & .ant-select-selection-search {
          top: 1.5rem;
          left: 1rem;

          & .ant-select-selection-search-input {
            height: auto;
            line-height: inherit;
          }
        }
      }
    }

    &-multiple {
      & .ant-select-selector {
        & .ant-select-selection-overflow,
        & .ant-select-selection-placeholder {
          height: auto;
          ${pickThemeFontStyles('14', '20')};
        }

        & .ant-select-selection-placeholder {
          top: 1.5rem;
          left: 1rem;
          transform: initial;
          padding-inline-end: 1.125rem;
        }

        & .ant-select-selection-item {
          margin: 0;
          padding: 0;
          border: none;
          background: none;
        }

        & .ant-select-selection-search {
          margin: 0;

          & .ant-select-selection-search-input {
            height: auto;
            line-height: inherit;
          }
        }

        &::after {
          margin: 0;
          line-height: ${pickThemeFontSize('20')};
        }
      }
    }

    &-single:not(&-customize-input) .ant-select-selector,
    &-multiple:not(&-customize-input) .ant-select-selector {
      padding: 1.5rem 2.5rem 0.5rem 1rem;
      min-height: 3.25rem;
      background: ${COLORS.LIGHTEST_GRAY};
      text-align: start;

      & .ant-select-selection-overflow {
        gap: 0.25rem;
      }
    }
  }

  @media screen and ${DEVICES.LAPTOP_S} {
    &.ant-select {
      &-single {
        & .ant-select-selector {
          &,
          & .ant-select-selection-item,
          & .ant-select-selection-placeholder {
            ${pickThemeFontStyles('16', '24')};
          }

          & .ant-select-selection-search {
            top: 1.725rem;
          }
        }
      }

      &-multiple {
        & .ant-select-selector {
          & .ant-select-selection-overflow,
          & .ant-select-selection-placeholder {
            ${pickThemeFontStyles('16', '24')};
          }

          & .ant-select-selection-placeholder {
            top: 1.725rem;
          }

          &::after {
            line-height: ${pickThemeFontSize('24')};
          }
        }
      }

      &-single:not(&-customize-input) .ant-select-selector,
      &-multiple:not(&-customize-input) .ant-select-selector {
        padding: 1.725rem 2.5rem 0.5rem 1rem;
        min-height: 3.75rem;
      }
    }
  }

  ${StyledPrefix} + &.ant-select {
    &-single:not(&-customize-input) .ant-select-selector,
    &-multiple:not(&-customize-input) .ant-select-selector {
      padding-left: 2.875rem;
    }

    &-multiple .ant-select-selection-placeholder,
    &-single .ant-select-selector .ant-select-selection-search {
      left: 2.875rem;
    }
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  ${arrowStyles};
  ${selectStyles};
` as typeof Select;

export const StyledDownWrapper = styled.div`
  & .ant-select-item {
    ${pickThemeFontStyles('16', '24')};

    padding: 0 1rem;

    &-option {
      & .ant-select-item-option-content,
      & .ant-select-item-option-state {
        padding: 1rem 0;
      }
    }
  }
`;

export const StyledTag = styled.div<{
  $primaryColor: string;
  $isHighlighted?: boolean;
}>`
  ${pickThemeFontStyles('14', '16', 'SEMI_BOLD')};
  text-align: start;
  border: 1px solid ${({ $primaryColor }) => $primaryColor};
  background: ${COLORS.WHITE};
  padding: 0.25rem 0.75rem;
  border-radius: 3rem;
  height: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & button {
    display: flex;
  }

  & .anticon {
    font-size: ${pickThemeFontSize('16')};
    color: ${COLORS.DARK_GRAY};
    cursor: pointer;
  }

  ${({ $isHighlighted, $primaryColor }) =>
    $isHighlighted &&
    css`
      background: ${$primaryColor + '33'};
    `}
`;
