import {IHotel} from '@/interfaces/domain/IHotel';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {BaseEntityService} from './base/BaseEntityService';

/**
 * HotelService provides methods to interact with custom hotel-related endpoints.
 * It extends BaseEntityService to leverage common CRUD operations and JWT handling.
 */
export default class HotelService extends BaseEntityService<IHotel> {
  //takes setJwtResponse method as parameter
  constructor(
    setJwtResponse: ((data: IJWTResponse | undefined) => void) | null
  ) {
    //sets base url
    super(
      'v1/hotels',
      setJwtResponse as (data: IJWTResponse | undefined) => void
    );
  }

  // Additional methods
}
