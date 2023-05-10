import { useCallback, useRef } from 'react';
import { InputRef } from 'antd';
import { useTranslation } from 'react-i18next';
import { FilterDropdownProps } from 'antd/es/table/interface';

import {
  StyledButton,
  StyledDropdown,
  StyledInput,
  StyledSpace,
} from './FiltersDropdownStyles';
import { SearchOutlined } from '@ant-design/icons';

interface IFiltersDropdownProps extends FilterDropdownProps {}

const FiltersDropdown = ({
  clearFilters,
  close,
  confirm,
  selectedKeys,
  setSelectedKeys,
}: IFiltersDropdownProps) => {
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    },
    [setSelectedKeys],
  );

  const handleConfirm = useCallback(
    (closeDropdown: boolean) => () => {
      confirm?.({ closeDropdown });
    },
    [confirm],
  );

  const handleReset = useCallback(() => {
    clearFilters?.();
    handleConfirm(true);
  }, [clearFilters, handleConfirm]);

  return (
    <StyledDropdown onKeyDown={(e) => e.stopPropagation()}>
      <StyledInput
        ref={searchInput}
        placeholder={t('enterValue') as string}
        value={selectedKeys[0]}
        onChange={handleInputChange}
        onPressEnter={handleConfirm(true)}
      />
      <StyledSpace>
        <StyledButton
          type="primary"
          size="small"
          onClick={handleConfirm(true)}
          icon={<SearchOutlined />}
        >
          {t('search')}
        </StyledButton>
        <StyledButton size="small" onClick={handleReset}>
          {t('reset')}
        </StyledButton>
        <StyledButton size="small" onClick={close}>
          {t('close')}
        </StyledButton>
      </StyledSpace>
    </StyledDropdown>
  );
};

export default FiltersDropdown;
