import { ColumnsType } from 'antd/es/table';
import { TFunction } from 'i18next';

import { IUser, IUsersFiltersDTO } from '@/models/user.model';
import { COLORS } from '@/theme';
import { Button } from '@/ui';

import { prepareSearchColumn } from '../helpers/prepareSearchColumn';

interface IGetTableColumnsParams {
  onUpdateUser: (user: IUser) => void;
  onDeleteUser: (user: IUser) => void;
  filters: IUsersFiltersDTO;
  t: TFunction;
}

export const getTableColumns = ({
  onUpdateUser,
  onDeleteUser,
  filters,
  t,
}: IGetTableColumnsParams): ColumnsType<IUser> => [
  {
    dataIndex: 'firstName',
    key: 'firstName',
    title: t('firstName'),
    width: '20%',
    ...prepareSearchColumn({
      filterValue: filters.firstName,
    }),
    filterSearch: true,
    sortDirections: ['descend', 'ascend'],
    sorter: { multiple: 1 },
  },
  {
    dataIndex: 'lastName',
    key: 'lastName',
    title: t('lastName'),
    width: '20%',
    ...prepareSearchColumn({
      filterValue: filters.lastName,
    }),
    sortDirections: ['descend', 'ascend'],
    sorter: { multiple: 2 },
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'E-mail',
    width: '35%',
    ...prepareSearchColumn({
      filterValue: filters.email,
    }),
    sortDirections: ['descend', 'ascend'],
    sorter: { multiple: 3 },
  },
  {
    dataIndex: 'isActive',
    key: 'isActive',
    title: t('active'),
    width: '10%',
    align: 'center',
    filters: [
      { text: t('active'), value: true },
      { text: t('inactive'), value: false },
    ],
    filterMultiple: false,
    onCell: (data) => {
      return {
        style: {
          background: data.isActive ? COLORS.CELL_GREEN : COLORS.CELL_RED,
          fontWeight: 'bold',
        },
      };
    },
    render: (value: boolean) => {
      return value ? 'Active' : 'Inactive';
    },
  },
  {
    key: 'edit',
    title: t('edit'),
    align: 'center',
    width: '5%',
    render: (_, record) => {
      return <Button onClick={() => onUpdateUser(record)}>{t('edit')}</Button>;
    },
  },
  {
    key: 'action',
    align: 'center',
    title: t('delete'),
    width: '5%',
    render: (_, record) => {
      return (
        <Button danger onClick={() => onDeleteUser(record)}>
          {t('delete')}
        </Button>
      );
    },
  },
];
