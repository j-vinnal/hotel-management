import {ILoginData} from '@/interfaces/auth/ILoginData';
import {IRegisterData} from '@/interfaces/auth/IRegisterData';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {BaseService} from './base/BaseService';

export class IdentityService extends BaseService {
  constructor() {
    super('v1/identity/account');
  }

  async register(data: IRegisterData): Promise<IResultObject<IJWTResponse>> {
    try {
      const response = await this.axios.post<IJWTResponse>('register', data);

      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  async login(data: ILoginData): Promise<IResultObject<IJWTResponse>> {
    try {
      const response = await this.axios.post<IJWTResponse>('login', data);

      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  async refreshToken(data: IJWTResponse): Promise<IResultObject<IJWTResponse>> {
    try {
      const response = await this.axios.post<IJWTResponse>('refreshtoken', data);
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  async logout(data: IJWTResponse, router: AppRouterInstance): Promise<IResultObject<boolean>> {
    try {
      const response = await this.axios.post('logout', data, {
        headers: {
          Authorization: 'Bearer ' + data.jwt,
        },
      });
      if (response.status < 300) {
        router.push('/');
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }
}
