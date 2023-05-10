import {
  ILoginDTO,
  ILoginResponse,
  staticAuthEndpoints,
} from '@/models/auth.model';
import { httpClient } from '@/utils';

class AuthAPI {
  static async login(payload: ILoginDTO): Promise<ILoginResponse> {
    const { LOGIN_USER } = staticAuthEndpoints;
    const { data } = await httpClient.post<ILoginResponse>(LOGIN_USER, payload);
    return data;
  }
}

export default AuthAPI;
