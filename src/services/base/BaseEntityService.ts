import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IBaseEntity} from '@/interfaces/domain/IBaseEntity';
import {AxiosError} from 'axios';
import {BaseService} from './BaseService';
import IdentityService from '../IdentityService';

export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService {
  protected constructor(
    baseURL: string,
    protected setJwtResponse: (data: IJWTResponse | undefined) => void
  ) {
    super(baseURL);
  }

  protected async handle401Error(e: AxiosError, jwtData: IJWTResponse): Promise<IResultObject<any> | null> {
    if (e.response?.status === 401) {
      const identityService = new IdentityService();
      const refreshedJwt = await identityService.refreshToken(jwtData);

      if (refreshedJwt.data) {
        // Update JWT
        this.setJwtResponse(refreshedJwt.data);
        return null;
      } else {
        return {errors: ['Failed to refresh JWT. Please log in again.']};
      }
    }
    return null;
  }

  async getRequest(jwtData: IJWTResponse, retry: boolean = true): Promise<IResultObject<TEntity[]>> {
    try {
      const response = await this.axios.get<TEntity[]>('', {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      if (e.response?.status === 401 && retry) {
        const retryResult = await this.handle401Error(e, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.getRequest(jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(e);
    }
  }


  async getRequestPublic(): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axios.get<TEntity>('');
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      return this.handleError(e);
    }
  }

  async postRequest(entity: TEntity, jwtData: IJWTResponse, retry: boolean = true): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axios.post<TEntity>('', entity, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });

      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      if (e.response?.status === 401 && retry) {
        const retryResult = await this.handle401Error(e, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.postRequest(entity, jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(e);
    }
  }

  async putRequest(id: string, entity: TEntity, jwtData: IJWTResponse, retry: boolean = true): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axios.put<TEntity>(`${id}`, entity, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      if (e.response?.status === 401 && retry) {
        const retryResult = await this.handle401Error(e, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.putRequest(id, entity, jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(e);
    }
  }

  async deleteRequest(id: string, jwtData: IJWTResponse, retry: boolean = true): Promise<IResultObject<number>> {
    try {
      const response = await this.axios.delete(`${id}`, {
        headers: {
          Authorization: 'Bearer ' + jwtData.jwt,
        },
      });
      if (response.status < 300) {
        return {data: response.data};
      }
      return {errors: [`${response.status} ${response.statusText}`]};
    } catch (e: any) {
      if (e.response?.status === 401 && retry) {
        const retryResult = await this.handle401Error(e, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.deleteRequest(id, jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(e);
    }
  }
}
