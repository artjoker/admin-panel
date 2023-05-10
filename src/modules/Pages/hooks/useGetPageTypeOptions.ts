import { useTranslation } from 'react-i18next';
import { PageType } from '@/models/page.model';

const optionsValue = [
  PageType.TEMPLATE,
  PageType.HOME,
  PageType.CONTACTS,
  PageType.BLOG,
  PageType.ARTICLE,
];

export const useGetPageTypeOptions = () => {
  const { t } = useTranslation();

  return optionsValue.map((option) => ({
    value: option,
    label: t(`pageType.${option}`),
  }));
};
