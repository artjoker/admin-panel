import { IDeleteUserDTO } from '@/models/user.model';

class DeleteUserDTO implements IDeleteUserDTO {
  id;

  constructor(id: string) {
    this.id = id;
  }
}

export default DeleteUserDTO;
