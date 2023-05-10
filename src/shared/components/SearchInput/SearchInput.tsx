import { ChangeEventHandler, useCallback, useEffect, useMemo } from 'react';
import { SearchProps } from 'antd/es/input';
import debounce from 'lodash.debounce';

import { StyledSearchInput } from './SearchInputStyles';

type ISearchInputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & SearchProps;

const SearchInput = (props: ISearchInputProps) => {
  const changeHandler = useMemo(() => {
    if (props.onChange) {
      return debounce(props.onChange, 300);
    }
  }, [props]);

  useEffect(() => {
    return () => {
      changeHandler?.cancel();
    };
  }, [changeHandler]);

  return <StyledSearchInput {...props} onChange={changeHandler} />;
};

export default SearchInput;
