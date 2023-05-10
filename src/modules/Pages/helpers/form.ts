import {
  useGetRequiredRule,
  useLengthValidationRule,
  useMultiLangRequiredValidationRule,
  useSlugValidationRule,
} from '../../../shared/hooks/formValidations';
import { PageFieldName } from '../types';

export const useFormValidationRules = () => {
  const required = useGetRequiredRule();
  const contentLength = useLengthValidationRule({ min: 4 });
  const titleMultiLang = useMultiLangRequiredValidationRule({
    fieldName: PageFieldName.TITLE,
    atLeastOne: true,
  });
  const slugValidation = useSlugValidationRule();

  return {
    [PageFieldName.TITLE]: [titleMultiLang],
    [PageFieldName.URL_SLUG]: [required, contentLength, slugValidation],
  };
};
