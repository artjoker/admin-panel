import styled from 'styled-components';
import { DatePicker } from 'antd';
import {
  COLORS,
  DEVICES,
  pickThemeFontSize,
  pickThemeFontStyles,
} from '@/theme';

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  &.ant-picker {
    border: 1px solid ${COLORS.DIVIDER};
    background: ${COLORS.LIGHTEST_GRAY};
    padding: 0 1rem 0 0;
    box-shadow: none;

    & .ant-picker-input input {
      padding: 1.375rem 1rem 0.5rem;
      height: auto;
      ${pickThemeFontStyles('14', '20')};
      color: ${COLORS.DARKEST_GRAY};

      @media screen and ${DEVICES.LAPTOP_S} {
        padding: 1.625rem 1rem 0.5rem;
      }
    }

    & .ant-picker-suffix,
    & .ant-picker-clear {
      font-size: ${pickThemeFontSize('20')};
      color: ${COLORS.DARKEST_GRAY};
    }

    &:not(&-disabled):hover,
    &-focused {
      border: 1px solid ${COLORS.VIOLET_PRIMARY};
    }
  }
`;
