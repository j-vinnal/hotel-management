import { IBaseEntity } from '@/interfaces/domain/IBaseEntity';
import { JWTContext } from '@/states/contexts/JWTContext';

import { checkJwtAndHandleError } from '@/utils/checkJwtAndHandleError';

import { handleResponseErrors } from '@/utils/handleResponseErrors';
import { useCallback, useContext, useEffect, useState } from 'react';

const useEntityActions = <T extends IBaseEntity>(
  ServiceClass: any,
  requireJwt: boolean = true
) => {
  const { jwtResponse, setJwtResponse } = useContext(JWTContext)!;
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const editEntity = async (id: string, entity: T) => {
    console.log('editEntity', id, entity);

    setLoading(true);
    setError(null);
    const service = new ServiceClass(setJwtResponse);
    try {
      checkJwtAndHandleError(jwtResponse);
      const response = await service.putRequest(id, entity, jwtResponse!);
      handleResponseErrors(response);
      return response.data;
    } catch (error) {
      console.log('editEntity error', error);
      setError((error as Error).message);
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
  }, [setLoading, setJwtResponse, ServiceClass, jwtResponse]);

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
