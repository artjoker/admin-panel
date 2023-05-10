import { Language, MultiLang } from './types';

export const anyLangValue = (multiLang: MultiLang) => {
  const languages = Object.values(Language);

  for (const lang of languages) {
    const value = multiLang[lang as Language];

    if (value) {
      return value;
    }
  }

  return '';
};
