import { ReactNode, useCallback, MouseEvent, useMemo } from 'react';
import { SelectProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import { useThemeToken } from '@/hooks';

import PureIconButton from '../PureIconButton/PureIconButton';
import StaticLabel from '../StaticLabel/StaticLabel';
import {
  StyledDownWrapper,
  StyledPrefix,
  StyledSelect,
  StyledTag,
  StyledWrapper,
} from './SelectStyles';

export type TSelectOption<V> = {
  value: V;
  label: string | JSX.Element;
};

export type TSelectOptions<V> = Array<TSelectOption<V>>;

export interface ISelectProps<Value, OptionValue>
  extends SelectProps<Value, TSelectOption<OptionValue>> {
  options: TSelectOptions<OptionValue>;
  isMultiselect?: boolean;
  noResultMessage?: string;
  label?: string;
  prefix?: ReactNode;
  withRequiredMark?: boolean;
  highlightFirstSelectedItem?: boolean;
}

const Select = <
  Value extends
    | string
    | number
    | number[]
    | string[]
    | TSelectOptions<string | number>,
  OptionValue extends string | number,
>({
  label,
  isMultiselect,
  options,
  noResultMessage,
  showArrow = true,
  value,
  suffixIcon,
  prefix,
  id,
  withRequiredMark,
  highlightFirstSelectedItem,
  ...props
}: ISelectProps<Value, OptionValue>): JSX.Element => {
  const token = useThemeToken();

  const firstSelectedValue = useMemo(() => {
    const firstSelectedItem = Array.isArray(value)
      ? value[0]
      : (value as string | number | TSelectOption<string | number>);

    if (!firstSelectedItem) {
      return '';
    }

    const isPrimitive =
      typeof firstSelectedItem === 'string' ||
      typeof firstSelectedItem === 'number';

    return isPrimitive ? firstSelectedItem : firstSelectedItem.value;
  }, [value]);

  const renderTag = useCallback(
    ({ label, onClose, value: tagValue }: CustomTagProps) => {
      const handleClose = (evt: MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        onClose();
      };

      const onPreventMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };

      const isFirst = firstSelectedValue === tagValue;

      return (
        <StyledTag
          onMouseDown={onPreventMouseDown}
          $primaryColor={token.colorPrimary}
          $isHighlighted={highlightFirstSelectedItem && isFirst}
        >
          <span>{label}</span>
          <PureIconButton onClick={handleClose}>
            <CloseOutlined />
          </PureIconButton>
        </StyledTag>
      );
    },
    [firstSelectedValue, highlightFirstSelectedItem, token.colorPrimary],
  );

  const renderDropdown = useCallback(
    (menu: ReactNode) => <StyledDownWrapper>{menu}</StyledDownWrapper>,
    [],
  );

  const selectComponent = (
    <StyledSelect<Value, TSelectOption<OptionValue>>
      {...props}
      value={value}
      options={options}
      optionFilterProp="label"
      tagRender={renderTag}
      dropdownRender={renderDropdown}
      {...(isMultiselect ? { mode: 'multiple' } : {})}
      {...(showArrow
        ? {
            showArrow: true,
          }
        : { showArrow: false })}
      {...(suffixIcon ? { suffixIcon, showArrow: true } : {})}
      // Hack for disabling browser autocomplete
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      autoComplete="dontshow"
    />
  );

  return (
    <StaticLabel
      label={label || ''}
      withPrefix={!!prefix}
      id={id}
      withRequiredMark={withRequiredMark}
    >
      <StyledWrapper>
        {!!prefix && <StyledPrefix>{prefix}</StyledPrefix>}

        {selectComponent}
      </StyledWrapper>
    </StaticLabel>
  );
};

export default Select;
