import { Sort } from '@/models/user.model';

export enum UserFieldsNames {
  ID = 'id',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  IS_ACTIVE = 'isActive',
}

export type TCreateUserFormValues = {
  [UserFieldsNames.FIRST_NAME]: string;
  [UserFieldsNames.LAST_NAME]: string;
  [UserFieldsNames.EMAIL]: string;
  [UserFieldsNames.PASSWORD]: string;
  [UserFieldsNames.CONFIRM_PASSWORD]: string;
  [UserFieldsNames.IS_ACTIVE]: boolean;
};

export type TUpdateUserFormValues = {
  [UserFieldsNames.FIRST_NAME]?: string;
  [UserFieldsNames.LAST_NAME]?: string;
  [UserFieldsNames.EMAIL]?: string;
  [UserFieldsNames.IS_ACTIVE]?: boolean;
  [UserFieldsNames.PASSWORD]?: string;
};

export type TChangePasswordFormValues = {
  [UserFieldsNames.PASSWORD]: string;
  [UserFieldsNames.CONFIRM_PASSWORD]: string;
};

export type TSortValues = {
  [UserFieldsNames.FIRST_NAME]?: Sort;
  [UserFieldsNames.LAST_NAME]?: Sort;
  [UserFieldsNames.EMAIL]?: Sort;
};

export type TUsersFilterValues = Partial<TUpdateUserFormValues>;
