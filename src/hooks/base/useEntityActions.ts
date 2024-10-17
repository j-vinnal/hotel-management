import {IBaseEntity} from '@/interfaces/domain/IBaseEntity';
import {JWTContext} from '@/states/contexts/JWTContext';
import {checkJwtAndHandleError} from '@/utils/checkJwtAndHandleError';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useCallback, useContext, useState} from 'react';

/**
 * Custom hook to manage CRUD operations for entities.
 *
 * @template T - The type of the entity extending IBaseEntity.
 * @param {any} ServiceClass - The service class used for API requests.
 * @param {boolean} [requireJwt=true] - Flag to determine if JWT is required for requests.
 * @returns {object} An object containing methods for CRUD operations and state.
 */
const useEntityActions = <T extends IBaseEntity>(
  ServiceClass: any,
  requireJwt: boolean = true
) => {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Adds a new entity.
   *
   * @param {T} entity - The entity to add.
   * @returns {Promise<any>} The response data from the API.
   */
  const addEntity = async (entity: T) => {
    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.postRequest(entity, jwtResponse!);

      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edits an existing entity.
   *
   * @param {string} id - The ID of the entity to edit.
   * @param {T} entity - The updated entity data.
   * @returns {Promise<any>} The response data from the API.
   */
  const editEntity = async (id: string, entity: T) => {
    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.putRequest(id, entity, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes an entity.
   *
   * @param {string} id - The ID of the entity to delete.
   * @returns {Promise<any>} The response data from the API.
   */
  const deleteEntity = async (id: string) => {
    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.deleteRequest(id, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all entities.
   */
  const fetchEntity = useCallback(async () => {
    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      let response;
      if (requireJwt) {
        checkJwtAndHandleError(jwtResponse);
        response = await service.getRequest(jwtResponse!);
      } else {
        response = await service.getRequestPublic();
      }
      handleResponseErrors(response);
      setEntities(response.data || []);
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setJwtResponse, ServiceClass, jwtResponse, requireJwt]);

  /**
   * Fetches a single entity by ID.
   *
   * @param {string} id - The ID of the entity to fetch.
   * @returns {Promise<any>} The response data from the API.
   */
  const fetchEntityById = async (id: string) => {
    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.getRequestById(id, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    addEntity,
    editEntity,
    deleteEntity,
    entities,
    loading,
    error,
    refetch: fetchEntity,
    fetchEntityById,
  };
};

export default useEntityActions;
