import { IUsersSortDTO } from '@/models/user.model';

import { UserFieldsNames } from '../types';

class UsersSortDTO implements IUsersSortDTO {
  firstName?;
  lastName?;
  email?;

  constructor(values: IUsersSortDTO) {
    this.firstName = values[UserFieldsNames.FIRST_NAME];
    this.lastName = values[UserFieldsNames.LAST_NAME];
    this.email = values[UserFieldsNames.EMAIL];
  }
}

export default UsersSortDTO;
