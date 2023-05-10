import { Navigate } from 'react-router-dom';

import { Language } from '@/modules/Language';
import { NotFound } from '@/pages';
import { Routes } from '@/constants/routes';

interface IMultiLanguagesRouteProps {
  children: JSX.Element;
  language: Language;
  path: string;
  isValidLanguage: boolean;
}

export const MultiLanguagesRoute = ({
  children,
  language,
  path,
  isValidLanguage,
}: IMultiLanguagesRouteProps) => {
  const path_ = `${path.replace(`/${Language.EN}`, '')}`;

  return isValidLanguage ? (
    language === Language.EN ? (
      <Navigate to={path_ ? `${path_}` : Routes.NOT_FOUND} />
    ) : (
      children
    )
  ) : (
    <NotFound />
  );
};
