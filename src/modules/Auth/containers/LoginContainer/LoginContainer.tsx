import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Language } from '@/modules/Language';
import { Form, FormItem } from '@/components';
import { Button, Input, PasswordInput } from '@/ui';

import { useLogin } from '../../features';
import {
  StyledButtonContainer,
  StyledLoginContainer,
  StyledLoginForm,
  StyledRememberContainer,
  StyledTitle,
} from './LoginContainerStyles';
import { LoginUserDTO } from '../../dtos';
import { useGetFormValidationRules } from '../../helpers';
import { TLoginUserFormValues, UserLoginNames } from '../../types';

const LoginContainer = () => {
  const { email, password } = useGetFormValidationRules();
  const { loginUser, loginUserLoading } = useLogin();

  const navigate = useNavigate();
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const handleLoginUser = async (values: TLoginUserFormValues) => {
    const login = new LoginUserDTO(values);

    loginUser(login, {
      onSuccess: (data) => {
        const storage = values.rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        navigate(language === Language.EN ? `/` : `/${language}/`);
      },
    });
  };

  return (
    <StyledLoginContainer>
      <StyledLoginForm>
        <StyledTitle>{t('signIn')}</StyledTitle>
        <Form onFinish={handleLoginUser}>
          <FormItem name={UserLoginNames.EMAIL} rules={email}>
            <Input label="Email" placeholder="Email" type="email" />
          </FormItem>
          <FormItem name={UserLoginNames.PASSWORD} rules={password}>
            <PasswordInput
              label={t('password')}
              placeholder={t('password') as string}
            />
          </FormItem>
          <StyledRememberContainer
            label={t('rememberMe')}
            name={UserLoginNames.REMEMBER_ME}
            valuePropName="checked"
          >
            <Checkbox disabled={loginUserLoading} />
          </StyledRememberContainer>
          <StyledButtonContainer>
            <Button type="primary" htmlType="submit">
              {t('signIn')}
            </Button>
          </StyledButtonContainer>
        </Form>
      </StyledLoginForm>
    </StyledLoginContainer>
  );
};

export default LoginContainer;
