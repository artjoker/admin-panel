import styled, { css } from 'styled-components';
import { Input, Input as AntInput, InputNumber } from 'antd';
import {
  COLORS,
  DEVICES,
  pickThemeFontSize,
  pickThemeFontStyles,
} from '@/theme';
import { TInputSize } from './Input';

const getStylesBySize = (size?: TInputSize) => {
  switch (size) {
    default:
      return css`
        padding: 1.375rem 1rem 0.5rem;

        @media screen and ${DEVICES.LAPTOP_S} {
          padding: 1.625rem 1rem 0.5rem;
        }
      `;
  }
};

export const inputStyles = css<{ $size?: TInputSize }>`
  &.ant-input {
    width: 100%;
    background: ${COLORS.LIGHTEST_GRAY};
    ${pickThemeFontStyles('14', '20')};
    ${({ $size }) => getStylesBySize($size)};
    &:not(&-disabled):hover,
    &:not(&-disabled):focus,
    &-focused {
      background: ${COLORS.WHITE};
      box-shadow: none;
    }
  }

  &.ant-input-affix-wrapper {
    padding: 0;
    overflow: hidden;

    & .ant-input {
      ${({ $size }) => getStylesBySize($size)}
      background: ${COLORS.LIGHTEST_GRAY};
      ${pickThemeFontStyles('14', '20')};
      &:not(&-disabled):hover,
      &:not(&-disabled):focus,
      &-focused {
        background: ${COLORS.WHITE};
        box-shadow: none;
      }
    }

    & .ant-input-suffix {
      font-size: ${pickThemeFontSize('20')};
      background: ${COLORS.LIGHTEST_GRAY};
      margin: 0;
      padding: 0 1rem 0 0.625rem;
    }

    & .ant-input-prefix {
      font-size: ${pickThemeFontSize('20')};
      background: ${COLORS.LIGHTEST_GRAY};
      margin: 0;
      padding: 0 0.625rem 0 1rem;

      & + .ant-input {
        padding: 1.375rem 1rem 0.5rem 0;
      }
    }
  }

  @media screen and ${DEVICES.LAPTOP_S} {
    &.ant-input {
      ${pickThemeFontStyles('16', '24')};
    }

    &.ant-input-affix-wrapper {
      & .ant-input {
        ${pickThemeFontStyles('16', '24')};
      }

      & .ant-input-prefix + .ant-input {
        padding: 1.625rem 1rem 0.5rem 0;
      }
    }
  }
`;

export const StyledInput = styled(AntInput)`
  ${inputStyles};
`;

export const StyledInputNumber = styled(InputNumber)`
  &.ant-input-number {
    width: 100%;
    padding: 0;
    border: 1px solid ${COLORS.DIVIDER};
    background: ${COLORS.WHITE};

    & .ant-input-number-input-wrap {
      & input {
        padding: 1.625rem 1rem 0.5rem;
        height: auto;
        color: ${COLORS.DARKEST_GRAY};
        ${pickThemeFontStyles('16', '20', 'SEMI_BOLD')};
      }
    }
  }
`;

export const StyledPasswordInput = styled(AntInput.Password)`
  ${inputStyles};
`;

export const StyledTextArea = styled(Input.TextArea)`
  ${inputStyles};
`;
export const StyledTextAreaWrap = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    height: 1.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    width: calc(100% - 2px);
    background-color: ${COLORS.LIGHTEST_GRAY};
    display: block;
    z-index: 1;
  }
`;

export const StyledPureTextArea = styled(Input.TextArea)`
  &.ant-input,
  & .ant-input,
  &.ant-input-status-warning:not(.ant-input-disabled):not(
      .ant-input-borderless
    ).ant-input,
  &
    .ant-input-status-warning:not(.ant-input-disabled):not(
      .ant-input-borderless
    ).ant-input {
    ${pickThemeFontStyles('16', '24')};
    border: 1px solid ${COLORS.DIVIDER};

    &:not(&-disabled):hover,
    &:not(&-disabled):focus,
    &-focused {
      border: 1px solid ${COLORS.BLUE_PRIMARY};
      box-shadow: none;
      background: ${COLORS.WHITE};
    }
  }

  &.ant-input-textarea-show-count.ant-input-textarea-in-form-item::after,
  &.ant-input-textarea-show-count::after {
    float: left;
    margin-bottom: 0;
    margin-top: 0.5rem;
    ${pickThemeFontStyles('12', '16')};
    color: ${COLORS.DARK_GRAY};
  }
`;
