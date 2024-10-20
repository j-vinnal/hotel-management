import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IRoom} from '@/interfaces/domain/IRoom';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {BaseEntityService} from './base/BaseEntityService';
import { IRoomAvailabilityRequest } from '@/interfaces/IRoomAvailabilityRequest';

/**
 * RoomService provides methods to interact with custom room-related endpoints.
 * It extends BaseEntityService to leverage common CRUD operations and JWT handling.
 */
export default class RoomService extends BaseEntityService<IRoom> {
  /**
   * Constructs a new instance of RoomService.
   *
   * @param {(data: IJWTResponse | undefined) => void} setJwtResponse - Function to update JWT response.
   */ constructor(
    setJwtResponse: ((data: IJWTResponse | undefined) => void) | null
  ) {
    //sets base url
    super(
      'v1/rooms',
      setJwtResponse as (data: IJWTResponse | undefined) => void
    );
  }

  // Additional methods

  /**
   * Retrieves available rooms based on the provided availability request.
   *
   * @param {IRoomAvailabilityRequest} request - The request object containing room availability criteria.
   * @returns {Promise<IResultObject<IRoom[]>>} A promise resolving to the result object containing an array of available rooms.
   */
  async getAvailableRooms(
    request: IRoomAvailabilityRequest
  ): Promise<IResultObject<IRoom[]>> {
    try {
      const response = await this.axios.get<IRoom[]>('', {
        params: request,
      });
      return {data: response.data};
    } catch (e: any) {
      return this.handleError(e);
    }
  }
}
