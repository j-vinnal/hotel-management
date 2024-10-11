import { IRoom } from '@/interfaces/domain/IRoom';
import { IJWTResponse } from '@/interfaces/IJWTResponse';
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

  // Additional methods
}
