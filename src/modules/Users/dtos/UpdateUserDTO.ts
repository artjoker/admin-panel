import { IUpdateUserDTO } from '@/models/user.model';
import { UserFieldsNames, TUpdateUserFormValues } from '../types';

class UpdateUserDTO implements IUpdateUserDTO {
  id;
  firstName?;
  lastName?;
  email?;
  isActive?;
  password?;

  constructor(id: string, values: TUpdateUserFormValues) {
    this.id = id;
    this.firstName = values[UserFieldsNames.FIRST_NAME];
    this.lastName = values[UserFieldsNames.LAST_NAME];
    this.email = values[UserFieldsNames.EMAIL];
    this.isActive = values[UserFieldsNames.IS_ACTIVE];
    this.password = values[UserFieldsNames.PASSWORD];
  }
}

export default UpdateUserDTO;
