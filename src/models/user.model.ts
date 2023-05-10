import { IBaseEntityModel } from './entity.model';
import { IPaginationDTO, IPaginationResponse } from './pagination.model';

export enum UserEndpoints {
  ROOT = '/users',
  FIND_USERS = '/find',
}

export const staticUserEndpoints = {
  GET_USERS: `${UserEndpoints.ROOT}${UserEndpoints.FIND_USERS}`,
  CREATE_USER: `${UserEndpoints.ROOT}`,
};

export const getUserEndpoints = (id: string) => ({
  GET_USER: `${UserEndpoints.ROOT}/${id}`,
  UPDATE_USER: `${UserEndpoints.ROOT}/${id}`,
  DELETE_USER: `${UserEndpoints.ROOT}/${id}`,
});

export interface IUser extends IBaseEntityModel {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export type ITableUser = Omit<IUser, 'id'>;

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IBaseUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export type IUsersFiltersDTO = Partial<IBaseUserDTO>;

export interface IUsersSortDTO {
  firstName?: Sort;
  lastName?: Sort;
  email?: Sort;
}

export interface IFindUsersDTO extends IPaginationDTO {
  filters?: IUsersFiltersDTO;
  sort?: IUsersSortDTO;
  search?: string;
}

export interface ICreateUserDTO extends IBaseUserDTO {
  password: string;
}

export interface IUpdateUserDTO extends Partial<IBaseUserDTO> {
  id: string;
  password?: string;
}

export interface IDeleteUserDTO {
  id: string;
}

export type IUsersResponse = IPaginationResponse<IUser>;
