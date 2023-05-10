export enum UserLoginNames {
  EMAIL = 'email',
  PASSWORD = 'password',
  REMEMBER_ME = 'rememberMe',
}

export type TLoginUserFormValues = {
  [UserLoginNames.EMAIL]: string;
  [UserLoginNames.PASSWORD]: string;
  [UserLoginNames.REMEMBER_ME]: boolean;
};
