import styled from 'styled-components';

export const LanguageSelectRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
`;

export const SelectWrapper = styled.div`
  flex-grow: 1;
  .ant-select-selection-item {
    color: black !important;
  }
`;

export const CountryFlagWrapper = styled.div`
  font-size: 2rem;
`;
