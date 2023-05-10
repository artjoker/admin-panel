import { ILoginDTO } from '@/models/auth.model';

import { TLoginUserFormValues, UserLoginNames } from '../types';

class LoginUserDTO implements ILoginDTO {
  email;
  password;

  constructor(values: TLoginUserFormValues) {
    this.email = values[UserLoginNames.EMAIL];
    this.password = values[UserLoginNames.PASSWORD];
  }
}

export default LoginUserDTO;
