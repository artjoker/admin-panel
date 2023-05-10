import {
  useGetEmailRule,
  useGetRequiredRule,
  useLengthValidationRule,
} from '@/hooks';

import { UserLoginNames } from '../types';

const useGetFormValidationRules = () => {
  const required = useGetRequiredRule();
  const textFieldLength = useLengthValidationRule({ min: 4, max: 30 });
  const email = useGetEmailRule();

  return {
    [UserLoginNames.EMAIL]: [required, email],
    [UserLoginNames.PASSWORD]: [required, textFieldLength],
  };
};

export default useGetFormValidationRules;
