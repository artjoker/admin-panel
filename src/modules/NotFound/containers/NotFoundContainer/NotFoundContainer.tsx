import Typography from 'antd/es/typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@/constants/routes';

import { StyledNotFoundContainer } from './NotFoundContainerStyles';

const NotFoundContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const loggedIn = !!(
      sessionStorage.getItem('token') || localStorage.getItem('token')
    );

    if (!loggedIn) navigate(Routes.LOGIN);
  }, [navigate]);

  return (
    <StyledNotFoundContainer
      status="404"
      title={<Typography.Title level={2}>404</Typography.Title>}
      subTitle={<Typography.Text>{t('Not Found')}</Typography.Text>}
    />
  );
};

export default NotFoundContainer;
