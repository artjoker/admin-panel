import { FilterValue } from 'antd/es/table/interface';

import { IUsersFiltersDTO } from '@/models/user.model';

import { getFilterValue } from '../helpers/tableUtils';

class UsersFilterDTO implements IUsersFiltersDTO {
  firstName?;
  lastName?;
  email?;
  isActive?;

  constructor(filters: Record<string, FilterValue | null>) {
    this.firstName = getFilterValue(filters, 'firstName');
    this.lastName = getFilterValue(filters, 'lastName');
    this.email = getFilterValue(filters, 'email');
    this.isActive = getFilterValue(filters, 'isActive');
  }
}

export default UsersFilterDTO;
