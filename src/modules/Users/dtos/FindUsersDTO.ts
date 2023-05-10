import {
  IFindUsersDTO,
  IUsersFiltersDTO,
  IUsersSortDTO,
} from '@/models/user.model';
import { getValidObject } from '../helpers/tableUtils';

class FindUsersDTO implements IFindUsersDTO {
  page;
  perPage;
  filters?;
  search?;
  sort?;

  constructor(
    page: number,
    perPage: number,
    filters: IUsersFiltersDTO,
    sort: IUsersSortDTO,
    search: string,
  ) {
    this.page = page;
    this.perPage = perPage;
    this.filters = getValidObject(filters);
    this.sort = getValidObject(sort);
    this.search = search;
  }
}
export default FindUsersDTO;
