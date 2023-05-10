export enum AuthEndpoints {
  ROOT = '/auth',
  LOGIN = '/login',
}

export const staticAuthEndpoints = {
  LOGIN_USER: `${AuthEndpoints.ROOT}${AuthEndpoints.LOGIN}`,
};

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
