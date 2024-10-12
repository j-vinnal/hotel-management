import { IResultObject } from '@/interfaces/auth/IResultObject';
import { IRoom } from '@/interfaces/domain/IRoom';
import { IJWTResponse } from '@/interfaces/IJWTResponse';
import { IRoomAvailabilityRequest } from '@/interfaces/RoomAvailabilityRequest';
import { BaseEntityService } from './base/BaseEntityService';

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

  private convertToUTC(date?: Date): Date | undefined {
    if (!date) return undefined;
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
  }

  async getAvailableRooms(
    request: IRoomAvailabilityRequest
  ): Promise<IResultObject<IRoom[]>> {
    const utcRequest = {
      ...request,
      startDate: this.convertToUTC(request.startDate),
      endDate: this.convertToUTC(request.endDate),
    };

    console.log('request', utcRequest);
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
