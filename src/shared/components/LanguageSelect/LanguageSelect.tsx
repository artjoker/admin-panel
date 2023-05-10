import { useTranslation } from 'react-i18next';
import { Language } from '@/modules/Language';
import { Select, TSelectOptions } from '@/ui';
import { LanguageSelectRoot, SelectWrapper } from './LanguageSelectStyles';

interface LanguageSelectProps {
  language: Language;
  onChange: (language: Language) => void;
  languageOptions: TSelectOptions<string>;
}

const LanguageSelect = ({
  language,
  onChange,
  languageOptions,
}: LanguageSelectProps) => {
  const { t } = useTranslation();

  return (
    <LanguageSelectRoot>
      <SelectWrapper>
        <Select
          label={t('language') as string}
          placeholder={t('language')}
          options={languageOptions}
          value={language}
          onChange={onChange}
        />
      </SelectWrapper>
    </LanguageSelectRoot>
  );
};

export default LanguageSelect;
