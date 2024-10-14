import { IResultObject } from '@/interfaces/auth/IResultObject';
import { IRoom } from '@/interfaces/domain/IRoom';
import { IJWTResponse } from '@/interfaces/IJWTResponse';
import { IRoomAvailabilityRequest } from '@/interfaces/IRoomAvailabilityRequest';
import { BaseEntityService } from './base/BaseEntityService';
import { convertToUTC } from '@/utils/convertToUTC';

export default class RoomService extends BaseEntityService<IRoom> {
  //takes setJwtResponse method as parameter
  constructor(
    setJwtResponse: ((data: IJWTResponse | undefined) => void) | null
  ) {
    //sets base url
    super(
      'v1/rooms',
      setJwtResponse as (data: IJWTResponse | undefined) => void
    );
  }


  async getAvailableRooms(
    request: IRoomAvailabilityRequest
  ): Promise<IResultObject<IRoom[]>> {
    const utcRequest = {
      ...request,
      startDate: convertToUTC(request.startDate),
      endDate: convertToUTC(request.endDate),
    };

    try {
      const response = await this.axios.get<IRoom[]>('', {
        params: utcRequest,
      });
      return { data: response.data };
    } catch (e: any) {
      return this.handleError(e);
    }
  }


  // Additional methods
}
