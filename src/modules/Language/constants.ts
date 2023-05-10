import { Language, MultiLang } from './types';

export const languageInterfaceOptions = [
  { label: 'English', value: Language.EN },
  { label: 'Русский', value: Language.RU },
];

export const languageOptions = [
  { label: 'English', value: Language.EN },
  { label: 'Українська', value: Language.UK },
  { label: 'Русский', value: Language.RU },
];

export const mapLanguageToShortName = {
  [Language.EN]: 'EN',
  [Language.UK]: 'UK',
  [Language.RU]: 'RU',
};

export const mapLanguageToCountryCode = {
  [Language.EN]: 'GB',
  [Language.UK]: 'UA',
  [Language.RU]: 'RU',
};

export const emptyMultiLangValue: MultiLang = {
  [Language.EN]: '',
  [Language.UK]: '',
  [Language.RU]: '',
};
