import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { Language } from '@/modules/Language';

interface IBaseLanguageRouteProps {
  children: JSX.Element;
}

export const BaseLanguageRoute = ({ children }: IBaseLanguageRouteProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    language !== Language.EN && i18next.changeLanguage(Language.EN);
  }, [language]);

  return children;
};
