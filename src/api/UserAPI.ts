import {
  ICreateUserDTO,
  IFindUsersDTO,
  IUpdateUserDTO,
  IUser,
  IUsersResponse,
  getUserEndpoints,
  staticUserEndpoints,
  IDeleteUserDTO,
} from '@/models/user.model';
import { httpClient } from '@/utils';

class UserAPI {
  static async findUsers(payload: IFindUsersDTO): Promise<IUsersResponse> {
    const { GET_USERS } = staticUserEndpoints;
    const { data } = await httpClient.post<IUsersResponse>(GET_USERS, {
      page: payload.page || 1,
      perPage: payload.perPage || 10,
      filters: payload.filters,
      search: payload.search,
      sort: payload.sort,
    });
    return data;
  }

  static async getUser(id: string): Promise<IUser> {
    const { GET_USER } = getUserEndpoints(id);
    const { data } = await httpClient.get<IUser>(GET_USER);
    return data;
  }

  static async createUser(user: ICreateUserDTO): Promise<IUser> {
    const { CREATE_USER } = staticUserEndpoints;
    const { data } = await httpClient.post<IUser>(CREATE_USER, user);
    return data;
  }

  static async updateUser({ id, ...user }: IUpdateUserDTO): Promise<IUser> {
    const { UPDATE_USER } = getUserEndpoints(id);
    const { data } = await httpClient.patch<IUser>(UPDATE_USER, user);
    return data;
  }

  static async deleteUser({ id }: IDeleteUserDTO): Promise<IUser> {
    const { DELETE_USER } = getUserEndpoints(id);
    const { data } = await httpClient.delete<IUser>(DELETE_USER);
    return data;
  }
}

export default UserAPI;
