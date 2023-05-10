import { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback } from 'react';
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';

import { IUsersFiltersDTO, IUsersSortDTO, IUser } from '@/models/user.model';
import { SearchInput } from '@/components';

import { getTableColumns } from '../../helpers/columns';
import { getSortValues } from '../../helpers/tableUtils';
import { StyledTable, StyledTableHeader } from './UserTableStyles';
import { UsersFilterDTO, UsersSortDTO } from '../../dtos';
import { Button } from '@/ui';

interface UserTableProps {
  isLoading: boolean;
  tableData?: IUser[];
  totalPages: number;
  perPage: number;
  onPageChange: (page: number, perPage: number) => void;
  onSearchFilterChange: (filter: string) => void;
  filters: IUsersFiltersDTO;
  onFilterChange: (value: IUsersFiltersDTO) => void;
  onSortChange: (value: IUsersSortDTO) => void;
  onDeleteUser: (user: IUser) => void;
  onUpdateUser: (user: IUser) => void;
  onAddUser: () => void;
}

const UserTable = ({
  isLoading,
  tableData,
  totalPages,
  perPage,
  onPageChange,
  onSearchFilterChange,
  filters,
  onFilterChange,
  onSortChange,
  onDeleteUser,
  onUpdateUser,
  onAddUser,
}: UserTableProps) => {
  const { t } = useTranslation();
  const columns = getTableColumns({
    onUpdateUser,
    onDeleteUser,
    filters,
    t,
  });

  const handleTableChange: TableProps<IUser>['onChange'] = useCallback(
    (
      _: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<IUser> | SorterResult<IUser>[],
    ) => {
      const usersFiltersDTO = new UsersFilterDTO(filters);
      const usersSortDTO = new UsersSortDTO(getSortValues(sorter));

      onFilterChange(usersFiltersDTO);
      onSortChange(usersSortDTO);
    },
    [onFilterChange, onSortChange],
  );

  const handlerSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onSearchFilterChange(e.target.value),
    [onSearchFilterChange],
  );

  return (
    <>
      <StyledTableHeader>
        <SearchInput
          placeholder={t('findUser') as string}
          onSearch={onSearchFilterChange}
          onChange={handlerSearchChange}
        />
        <Button onClick={onAddUser} size="middle" type="primary">
          {t('addUser')}
        </Button>
      </StyledTableHeader>
      <StyledTable
        bordered
        size="small"
        locale={{
          triggerDesc: t('sortDesc') as string,
          triggerAsc: t('sortAsc') as string,
          cancelSort: t('cancelSort') as string,
          emptyText: t('noData') as string,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={tableData}
        pagination={{
          total: totalPages * perPage,
          pageSize: perPage,
          size: 'default',
          onChange: onPageChange,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default UserTable;
