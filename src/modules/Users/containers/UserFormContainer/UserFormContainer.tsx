import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Input, PasswordInput, Switch } from '@/ui';
import {
  FormItem,
  showErrorToast,
  showSuccessToast,
  useForm,
} from '@/components';
import { Language } from '@/modules/Language';
import { Routes } from '@/constants/routes';
import { changeNavigatePath } from '@/modules/Layout/helpers';

import {
  useDeleteUser,
  useCreateUser,
  useUpdateUser,
  useGetUser,
} from '../../features/';
import {
  TCreateUserFormValues,
  TUpdateUserFormValues,
  UserFieldsNames,
} from '../../types';
import useGetFormValidationRules from '../../helpers/useGetFormValidationRules';
import {
  StyledButton,
  StyledButtonContainer,
  StyledDeleteButton,
  StyledDivider,
  StyledForm,
  StyledPasswordButton,
  StyledSwitchFormItem,
  StyledUserFormWrapper,
} from './UserFormContainerStyles';
import { userDataToFormValues } from '../../helpers/adapters';
import { ChangePasswordModal } from '../../components';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from '../../dtos';

const UserFormContainer = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState<boolean>(false);

  const params = useParams();

  const {
    t,
    i18n: { language },
  } = useTranslation();

  const navigate = useNavigate();

  const { user } = useGetUser(params?.id, {
    onError: () => {
      showErrorToast({
        message: `Something went wrong`,
      });
    },
  });

  const initialValues = useMemo<TUpdateUserFormValues & TCreateUserFormValues>(
    () => userDataToFormValues(user),
    [user],
  );

  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const [form] = useForm();

  const validationRules = useGetFormValidationRules();

  const handleSubmit = async (
    values: TUpdateUserFormValues & TCreateUserFormValues,
  ) => {
    if (user) {
      const updateUserDTO = new UpdateUserDTO(user.id, values);
      updateUser(updateUserDTO, {
        onSuccess: (data) => {
          navigate(changeNavigatePath(language as Language, Routes.USERS));

          const name = `${data.firstName} ${data.lastName}`;

          showSuccessToast({
            message: t('userUpdatedSuccessfully', { name }),
          });
        },
      });
      return;
    }

    const createUserDTO = new CreateUserDTO(values);
    createUser(createUserDTO, {
      onSuccess: (data) => {
        navigate(changeNavigatePath(language as Language, Routes.USERS));

        const name = `${data.firstName} ${data.lastName}`;

        showSuccessToast({
          message: t('userAddedSuccessfully', { name }),
        });
      },
    });
  };

  const handleDeleteUser = useCallback(() => {
    if (!user) {
      return;
    }

    const deleteUserDTO = new DeleteUserDTO(user.id);
    deleteUser(deleteUserDTO, {
      onSuccess: (data) => {
        navigate(changeNavigatePath(language as Language, Routes.USERS));

        const name = `${data.firstName} ${data.lastName}`;

        showSuccessToast({
          message: t('userDeletedSuccessfully', { name }),
        });
      },
    });
  }, [user?.id, deleteUser, showSuccessToast, navigate]);

  const handlePasswordModalOpen = useCallback(() => {
    setChangePasswordModalOpen(true);
  }, [setChangePasswordModalOpen]);

  const handlePasswordModalClose = useCallback(() => {
    setChangePasswordModalOpen(false);
  }, [setChangePasswordModalOpen]);

  const handleGoBack = useCallback(() => {
    navigate(changeNavigatePath(language as Language, Routes.USERS));
  }, [language, navigate]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  return (
    <StyledUserFormWrapper>
      <StyledForm
        onFinish={handleSubmit}
        form={form}
        initialValues={initialValues}
      >
        <FormItem
          name={UserFieldsNames.FIRST_NAME}
          rules={validationRules[UserFieldsNames.FIRST_NAME]}
        >
          <Input
            label={t('firstName')}
            placeholder={t('firstName') as string}
            type="string"
          />
        </FormItem>
        <FormItem
          name={UserFieldsNames.LAST_NAME}
          rules={validationRules[UserFieldsNames.LAST_NAME]}
        >
          <Input
            label={t('lastName')}
            placeholder={t('lastName') as string}
            type="string"
          />
        </FormItem>
        <FormItem
          name={UserFieldsNames.EMAIL}
          rules={validationRules[UserFieldsNames.EMAIL]}
        >
          <Input label="Email" placeholder="Email" type="string" />
        </FormItem>
        {!user ? (
          <>
            <FormItem
              name={UserFieldsNames.PASSWORD}
              rules={validationRules[UserFieldsNames.PASSWORD]}
            >
              <PasswordInput
                label={t('password')}
                placeholder={t('password') as string}
              />
            </FormItem>

            <FormItem
              name={UserFieldsNames.CONFIRM_PASSWORD}
              dependencies={[UserFieldsNames.PASSWORD]}
              rules={[
                ...validationRules[UserFieldsNames.CONFIRM_PASSWORD],
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue(UserFieldsNames.PASSWORD) === value
                    ) {
                      return Promise.resolve();
                    }

                    return Promise.reject(t('passwordMismatch'));
                  },
                }),
              ]}
            >
              <PasswordInput
                label={t('confirmPassword')}
                placeholder={t('confirmPassword') as string}
              />
            </FormItem>
          </>
        ) : (
          <>
            <StyledDivider />
            <StyledPasswordButton
              type="primary"
              size="large"
              onClick={handlePasswordModalOpen}
            >
              {t('changePassword')}
            </StyledPasswordButton>
          </>
        )}
        <StyledSwitchFormItem
          name={UserFieldsNames.IS_ACTIVE}
          valuePropName="checked"
          label={t('active')}
        >
          <Switch />
        </StyledSwitchFormItem>
        <StyledButtonContainer>
          <StyledButton type="primary" htmlType="submit">
            {user ? t('save') : t('add')}
          </StyledButton>
          <StyledButton onClick={handleGoBack} type="default">
            {t('back')}
          </StyledButton>
          {user && (
            <StyledDeleteButton onClick={handleDeleteUser} type="primary">
              {t('delete')}
            </StyledDeleteButton>
          )}
        </StyledButtonContainer>
      </StyledForm>
      {user && (
        <ChangePasswordModal
          userId={user.id}
          isOpen={changePasswordModalOpen}
          close={handlePasswordModalClose}
        />
      )}
    </StyledUserFormWrapper>
  );
};

export default UserFormContainer;
