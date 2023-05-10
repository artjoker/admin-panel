import { Language } from '@/modules/Language';

export const changeNavigatePath = (
  language: Language,
  path: string,
  params?: { params: string; value: string },
) => {
  const pathWithParams = params
    ? path.replace(`:${params.params}`, params.value)
    : path;
  return language === Language.EN
    ? pathWithParams
    : `/${language}${pathWithParams}`;
};
