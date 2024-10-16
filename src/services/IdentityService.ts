import {ILoginData} from '@/interfaces/auth/ILoginData';
import {IRegisterData} from '@/interfaces/auth/IRegisterData';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {BaseService} from './base/BaseService';

/**
 * IdentityService provides methods to interact with identity-related endpoints.
 * It extends BaseService to leverage common service operations.
 */
export default class IdentityService extends BaseService {
  /**
   * Constructs a new instance of IdentityService.
   */
  constructor() {
    super('v1/identity/account');
  }
  /**
   * Registers a new user account.
   *
   * @param {IRegisterData} data - The registration data for the account.
   * @returns {Promise<IResultObject<IJWTResponse>>} A promise resolving to the result object containing JWT response.
   */
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
  /**
   * Logs in a user.
   *
   * @param {ILoginData} data - The login data for the user.
   * @returns {Promise<IResultObject<IJWTResponse>>} A promise resolving to the result object containing JWT response.
   */
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
  /**
   * Refreshes the JWT token.
   *
   * @param {IJWTResponse} data - The current JWT data.
   * @returns {Promise<IResultObject<IJWTResponse>>} A promise resolving to the result object containing new JWT response.
   */
  async refreshToken(data: IJWTResponse): Promise<IResultObject<IJWTResponse>> {
    try {
      const response = await this.axios.post<IJWTResponse>(
        'refreshtoken',
        data
      );
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  /**
   * Logs out a user.
   *
   * @param {IJWTResponse} data - The JWT data for authentication.
   * @param {AppRouterInstance} router - The router instance to redirect after logout.
   * @returns {Promise<IResultObject<boolean>>} A promise resolving to the result object indicating success or failure.
   */
  async logout(
    data: IJWTResponse,
    router: AppRouterInstance
  ): Promise<IResultObject<boolean>> {
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
