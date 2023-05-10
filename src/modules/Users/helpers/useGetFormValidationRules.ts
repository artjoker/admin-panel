import {
  useGetEmailRule,
  useGetRequiredRule,
  useLengthValidationRule,
} from '../../../shared/hooks/formValidations';
import { UserFieldsNames } from '../types';

const useGetFormValidationRules = () => {
  const required = useGetRequiredRule();
  const textFieldLength = useLengthValidationRule({ min: 4, max: 30 });
  const email = useGetEmailRule();

  return {
    [UserFieldsNames.FIRST_NAME]: [required, textFieldLength],
    [UserFieldsNames.LAST_NAME]: [required, textFieldLength],
    [UserFieldsNames.EMAIL]: [required, email],
    [UserFieldsNames.PASSWORD]: [required, textFieldLength],
    [UserFieldsNames.CONFIRM_PASSWORD]: [required, textFieldLength],
    [UserFieldsNames.IS_ACTIVE]: [required],
  };
};

export default useGetFormValidationRules;
