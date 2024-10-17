import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IBaseEntity} from '@/interfaces/domain/IBaseEntity';
import {AxiosError} from 'axios';
import IdentityService from '../IdentityService';
import {BaseService} from './BaseService';

/**
 * BaseEntityService provides CRUD operations for entities that extend IBaseEntity.
 * It handles JWT authentication and token refresh logic.
 *
 * @template TEntity - The type of the entity extending IBaseEntity.
 */
export abstract class BaseEntityService<
  TEntity extends IBaseEntity,
> extends BaseService {
  /**
   * Constructs a new instance of BaseEntityService.
   *
   * @param {string} baseURL - The base URL for the service endpoints.
   * @param {(data: IJWTResponse | undefined) => void} setJwtResponse - Function to update JWT response.
   */
  protected constructor(
    baseURL: string,
    protected setJwtResponse: (data: IJWTResponse | undefined) => void
  ) {
    super(baseURL);
  }

  /**
   * Handles 401 Unauthorized errors by attempting to refresh the JWT token.
   *
   * @param {AxiosError} e - The Axios error object.
   * @param {IJWTResponse} jwtData - The current JWT data.
   * @returns {Promise<IResultObject<any> | null>} A result object or null if retry is possible.
   */
  protected async handle401Error(
    e: AxiosError,
    jwtData: IJWTResponse
  ): Promise<IResultObject<any> | null> {
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

  /**
   * Sends a GET request to retrieve a list of entities.
   *
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<TEntity[]>>} A promise resolving to the result object.
   */
  async getRequest(
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<TEntity[]>> {
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

  /**
   * Sends a GET request by id to retrieve an entity.
   *
   * @param {string} id - The id of the entity to retrieve.
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<TEntity>>} A promise resolving to the result object.
   */
  async getRequestById(
    id: string,
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axios.get<TEntity>(`${id}`, {
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
          return this.getRequestById(id, jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(e);
    }
  }

  /**
   * Sends a POST request to create a new entity.
   *
   * @param {TEntity} entity - The entity to create.
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<TEntity>>} A promise resolving to the result object.
   */
  async postRequest(
    entity: TEntity,
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<TEntity>> {
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

  /**
   * Sends a PUT request to update an existing entity.
   *
   * @param {string} id - The id of the entity to update.
   * @param {TEntity} entity - The updated entity data.
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<TEntity>>} A promise resolving to the result object.
   */
  async putRequest(
    id: string,
    entity: TEntity,
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<TEntity>> {
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

  /**
   * Sends a DELETE request to remove an entity.
   *
   * @param {string} id - The id of the entity to delete.
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<number>>} A promise resolving to the result object.
   */
  async deleteRequest(
    id: string,
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<number>> {
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
