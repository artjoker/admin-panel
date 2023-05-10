import { Table } from 'antd';
import styled from 'styled-components';

import { COLORS } from '@/theme';

export const StyledTable = styled(Table)`
  margin-top: 1rem;
` as typeof Table;

export const StyledTableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
