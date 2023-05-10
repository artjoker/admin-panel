import { IUser } from '@/models/user.model';
import {
  TCreateUserFormValues,
  TUpdateUserFormValues,
  UserFieldsNames,
} from '../types';

export const userDataToFormValues = (
  userData: IUser | null,
): TCreateUserFormValues & TUpdateUserFormValues => ({
  [UserFieldsNames.FIRST_NAME]: userData?.firstName ?? '',
  [UserFieldsNames.LAST_NAME]: userData?.lastName ?? '',
  [UserFieldsNames.EMAIL]: userData?.email ?? '',
  [UserFieldsNames.PASSWORD]: '',
  [UserFieldsNames.CONFIRM_PASSWORD]: '',
  [UserFieldsNames.IS_ACTIVE]: userData?.isActive ?? false,
});
