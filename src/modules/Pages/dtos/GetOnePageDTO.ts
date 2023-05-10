import { IGetOnePageDTO } from '@/models/page.model';

class GetOnePageDTO implements IGetOnePageDTO {
  slug;

  constructor(id: string) {
    this.slug = id;
  }
}

export default GetOnePageDTO;
