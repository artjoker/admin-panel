import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { matchRoutes, Params, useNavigate, useParams } from 'react-router-dom';

import {
  Routes,
  routesOrder,
  RoutesToLabels,
  RoutesToMenuItemKey,
} from '@/constants/routes';
import { languageInterfaceOptions } from '@/modules/Language';
import { Language } from '@/modules/Language/types';

import { MenuItem } from '../../types/MenuItem';
import {
  LanguageMenu,
  MenuContainer,
  NavMenu,
  StyledButton,
} from './NavMenuStyles';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const navigate = useNavigate();
  const params = useParams();

  const routes = Object.values(Routes).map((route) => ({
    path: route,
  }));

  const matchedRoutes = matchRoutes(routes, location);

  const currentRoute = matchedRoutes?.[0];

  const getRoutePath = (location: Location, params: Params): string => {
    const { pathname } = location;

    if (!Object.keys(params).length) {
      return pathname;
    }

    let path = pathname;

    Object.entries(params).forEach(([paramName, paramValue]) => {
      if (paramValue) {
        path = path.replace(paramValue, `:${paramName}`);
      }
    });

    return path.replace('/:lang', '');
  };

  const items: MenuItem[] = routesOrder.map<MenuItem>((route) => ({
    label: t(`${RoutesToLabels[route]}`),
    key: RoutesToMenuItemKey[route],
    onClick: ({ key }) => {
      navigate(language === Language.EN ? key : `/${language}${key}`);
    },
  }));

  const setLanguage = (language: Language) => {
    i18next.changeLanguage(language);

    navigate(
      language === Language.EN
        ? `${currentRoute!.route.path
            .replace('/:lang', '')
            .replace(':id', `${params.id}`)}`
        : `/${language}${currentRoute!.route.path
            .replace('/:lang', '')
            .replace(':id', `${params.id}`)}`,
    );
  };

  const logOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    navigate('/');
  };

  return (
    <MenuContainer>
      <NavMenu
        mode="horizontal"
        theme="dark"
        items={items}
        selectedKeys={[
          currentRoute
            ? String(
                RoutesToMenuItemKey[
                  getRoutePath(location, currentRoute?.params ?? {}) as Routes
                ],
              )
            : '',
        ]}
      />
      <LanguageMenu>
        <Select
          placeholder={t('language')}
          options={languageInterfaceOptions}
          value={language as Language}
          bordered={false}
          showArrow
          suffixIcon={<CaretDownOutlined />}
          onChange={setLanguage}
        />
      </LanguageMenu>

      <StyledButton type="primary" onClick={logOut}>
        {t`logOut`}
      </StyledButton>
    </MenuContainer>
  );
};

export default Navigation;
