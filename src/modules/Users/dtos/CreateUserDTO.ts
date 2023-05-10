import { ICreateUserDTO } from '@/models/user.model';
import { UserFieldsNames, TCreateUserFormValues } from '../types';

class CreateUserDTO implements ICreateUserDTO {
  firstName;
  lastName;
  email;
  password;
  isActive;

  constructor(values: TCreateUserFormValues) {
    this.firstName = values[UserFieldsNames.FIRST_NAME];
    this.lastName = values[UserFieldsNames.LAST_NAME];
    this.email = values[UserFieldsNames.EMAIL];
    this.password = values[UserFieldsNames.PASSWORD];
    this.isActive = values[UserFieldsNames.IS_ACTIVE];
  }
}

export default CreateUserDTO;
