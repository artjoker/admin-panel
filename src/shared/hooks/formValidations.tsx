import { useMemo } from 'react';
import { Rule, RuleObject, RuleRender } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

import { emailRegex, slugRegex } from '@/constants/common';
import { MultiLang } from '@/modules/Language';

export const useGetRequiredRule = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      required: true,
      message: t('requiredField'),
    }),
    [t],
  );
};

export const useGetEmailRule = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      pattern: emailRegex,
      message: t('invalidEmail'),
    }),
    [t],
  );
};

export const useLengthValidationRule = ({
  min,
  max,
}: {
  max?: number;
  min?: number;
}): Rule => {
  const { t } = useTranslation();

  return useMemo(() => {
    let message = '';

    if (min && max) {
      message = t('TheFieldMustBeBetweenMinAndMaxCharacters', { min, max });
    } else if (min) {
      message = t('FieldMustBeAtLeastMinCharacters', { min });
    } else if (max) {
      message = t('FieldMustBeUpToMaxCharacters', { max });
    }

    return { min, max, message };
  }, [max, min, t]);
};

interface TUseMultiLangRequiredValidationRuleParams {
  fieldName: string;
  atLeastOne?: boolean;
}

export const useMultiLangRequiredValidationRule = ({
  fieldName,
  atLeastOne = false,
}: TUseMultiLangRequiredValidationRuleParams): RuleRender => {
  const { t } = useTranslation();

  return ({ getFieldValue }) => {
    const multiLangValue: MultiLang = getFieldValue(fieldName);

    const validateMultiLang = (rule: RuleObject, value: string) => {
      const values = Object.values(multiLangValue);

      if (atLeastOne) {
        const isValid = values.some((v) => v.trim().length > 0);

        if (!isValid && !value.trim()) {
          return Promise.reject(t('atLeastOneLanguageIsRequired'));
        }

        return Promise.resolve();
      }

      const isValid = values.every((v) => v.trim().length > 0);

      if (!isValid && !value.trim()) {
        return Promise.reject(t('allLanguagesAreRequired'));
      }

      return Promise.resolve();
    };

    return { validator: validateMultiLang };
  };
};

export const useSlugValidationRule = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      pattern: slugRegex,
      message: t('slugContentError'),
    }),
    [t],
  );
};
