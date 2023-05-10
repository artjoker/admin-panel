import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IUsersFiltersDTO, IUsersSortDTO, IUser } from '@/models/user.model';
import { Modal, showErrorToast, showSuccessToast } from '@/components';
import { changeNavigatePath } from '@/modules/Layout/helpers';
import { Language } from '@/modules/Language';
import { Routes } from '@/constants/routes';

import { UserTable } from '../../components';
import { useFindUsers, useDeleteUser } from '../../features';
import { StyledModalText, StyledUserContainer } from './UsersContainerStyles';
import { DeleteUserDTO, FindUsersDTO } from '../../dtos';

const UsersContainer = () => {
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState<IUsersFiltersDTO>({});
  const [sort, setSort] = useState<IUsersSortDTO>({});

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const { foundUsers, foundUsersIsLoading } = useFindUsers(
    new FindUsersDTO(page, perPage, filters, sort, search),
  );
  const { deleteUser } = useDeleteUser();

  const preparedTableData = [...(foundUsers?.data ?? [])].map((user) => ({
    ...user,
    key: user.id,
  }));

  const handlePageChange = useCallback(
    (page: number, perPage: number) => {
      setPage(page);
      setPerPage(perPage);
    },
    [setPage, setPerPage],
  );

  const handleSearchFilterChange = useCallback(
    (search: string) => {
      setSearch(search);
    },
    [setSearch],
  );

  const handleFilterChange = useCallback(
    (value: IUsersFiltersDTO) => {
      setFilters(value);
    },
    [setFilters],
  );

  const handleSortChange = useCallback(
    (value: IUsersSortDTO) => {
      setSort(value);
    },
    [setSort],
  );

  const handleDeleteUser = useCallback(
    (user: IUser) => {
      setUserToDelete(user);
    },
    [setUserToDelete],
  );

  const handleDeleteModalOk = useCallback(() => {
    const user = userToDelete as IUser;

    const deleteUserDTO = new DeleteUserDTO(user.id);

    setConfirmLoading(false);
    deleteUser(deleteUserDTO, {
      onSuccess: (data) => {
        const name = `${data.firstName} ${data.lastName}`;

        if (data) {
          showSuccessToast({
            message: t('userDeletedSuccessfully', { name }),
          });
          return;
        }

        showErrorToast({
          message: `Something went wrong`,
        });
      },
      onSettled: () => {
        setUserToDelete(null);
        setConfirmLoading(false);
      },
    });
  }, [userToDelete, deleteUser, setUserToDelete, setConfirmLoading]);

  const handleDeleteModalCancel = useCallback(() => {
    setUserToDelete(null);
  }, [setUserToDelete]);

  const handleUpdateUser = useCallback(
    (user: IUser) =>
      navigate(
        changeNavigatePath(language as Language, Routes.USER_FORM_DATA, {
          params: 'id',
          value: user.id,
        }),
      ),
    [navigate, language],
  );

  const handleAddUser = useCallback(() => navigate('form'), [navigate]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <StyledUserContainer>
      <UserTable
        isLoading={foundUsersIsLoading}
        totalPages={foundUsers?.totalPages || 1}
        perPage={foundUsers?.perPage || 10}
        tableData={preparedTableData}
        onPageChange={handlePageChange}
        onFilterChange={handleFilterChange}
        filters={filters}
        onSortChange={handleSortChange}
        onSearchFilterChange={handleSearchFilterChange}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
        onAddUser={handleAddUser}
      />
      <Modal
        open={!!userToDelete}
        title={t('deleteUser')}
        onOk={handleDeleteModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteModalCancel}
        okText={t('yes')}
        okType="danger"
        cancelText={t('no')}
      >
        {userToDelete && (
          <StyledModalText>
            {t('deleteUserConfirm', {
              firstName: userToDelete.firstName,
              lastName: userToDelete.lastName,
            })}
          </StyledModalText>
        )}
      </Modal>
    </StyledUserContainer>
  );
};

export default UsersContainer;
