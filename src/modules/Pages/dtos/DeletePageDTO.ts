import { IDeletePageDTO } from '@/models/page.model';

class DeletePageDTO implements IDeletePageDTO {
  id;

  constructor(id: string) {
    this.id = id;
  }
}

export default DeletePageDTO;
