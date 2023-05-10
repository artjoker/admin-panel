// Components
import { useTranslation } from 'react-i18next';

import { PasswordInput } from '@/ui';
import {
  FormItem,
  Modal,
  showErrorToast,
  showSuccessToast,
  useForm,
} from '@/components';

import { useUpdateUser } from '../../features';
import useGetFormValidationRules from '../../helpers/useGetFormValidationRules';
import { TChangePasswordFormValues, UserFieldsNames } from '../../types';
import { StyledModalForm } from './ChangePasswordModalStyles';
import { UpdateUserDTO } from '../../dtos';

interface IChangePasswordModal {
  userId: string;
  isOpen: boolean;
  close: () => void;
}

const ChangePasswordModal = ({
  userId,
  isOpen,
  close,
}: IChangePasswordModal) => {
  const [form] = useForm();
  const { t } = useTranslation();
  const { updateUser } = useUpdateUser();

  const validationRules = useGetFormValidationRules();

  const handleOk = () => {
    if (!form.getFieldsError().find((field) => field.errors.length > 0)) {
      form.submit();
      close();
    }
  };

  const submitHandler = (values: TChangePasswordFormValues) => {
    const updateUserDTO = new UpdateUserDTO(userId, {
      password: values.password,
    });
    updateUser(updateUserDTO, {
      onSuccess: (data) => {
        const name = `${data.firstName} ${data.lastName}`;

        showSuccessToast({
          message: t('passwordForUpdatedSuccessfully', { name }),
        });
      },
      onError: () => {
        showErrorToast({
          message: 'Something went wrong',
        });
      },
    });

    form.resetFields();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={close}
      okType="danger"
      okText={t('edit')}
      cancelText={t('cancel')}
    >
      <StyledModalForm form={form} onFinish={submitHandler}>
        <FormItem
          name={UserFieldsNames.PASSWORD}
          rules={validationRules[UserFieldsNames.PASSWORD]}
        >
          <PasswordInput
            label={t('newPassword')}
            placeholder={t('newPassword') as string}
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
            label={t('confirmNewPassword')}
            placeholder={t('confirmNewPassword') as string}
          />
        </FormItem>
      </StyledModalForm>
    </Modal>
  );
};

export default ChangePasswordModal;
