import {IBooking} from '@/interfaces/domain/IBooking';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {BaseEntityService} from './base/BaseEntityService';

export class BookingService extends BaseEntityService<IBooking> {
  //takes setJwtResponse method as parameter
  constructor(setJwtResponse: ((data: IJWTResponse | undefined) => void) | null) {
    //sets base url
    super('v1/bookings', setJwtResponse as (data: IJWTResponse | undefined) => void);
  }


  // Additional methods 

}
