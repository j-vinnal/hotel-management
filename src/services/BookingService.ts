import { IResultObject } from '@/interfaces/auth/IResultObject';
import { IBooking } from '@/interfaces/domain/IBooking';
import { IJWTResponse } from '@/interfaces/IJWTResponse';
import axios from 'axios';
import { BaseEntityService } from './base/BaseEntityService';

export default class BookingService extends BaseEntityService<IBooking> {
  //takes setJwtResponse method as parameter
  constructor(
    setJwtResponse: ((data: IJWTResponse | undefined) => void) | null
  ) {
    //sets base url
    super(
      'v1/bookings',
      setJwtResponse as (data: IJWTResponse | undefined) => void
    );
  }

  // Additional methods

  // Method to fetch bookings with viewAll parameter
  async getBookings(
    jwtData: IJWTResponse,
    viewAll: boolean = true
  ): Promise<IResultObject<IBooking[]>> {
    try {
      const response = await this.axios.get<IBooking[]>('', {
        headers: {
          Authorization: `Bearer ${jwtData.jwt}`,
        },
        params: {
          viewAll: viewAll,
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const retryResult = await this.handle401Error(error, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.getBookings(jwtData, viewAll);
        }
        return retryResult;
      }
      return this.handleError(error);
    }
  }

  async cancelBooking(
    bookingId: string,
    jwtData: IJWTResponse,
    retry: boolean = true
  ): Promise<IResultObject<void>> {
    try {
      const response = await this.axios.post<void>(
        `${bookingId}/cancel`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtData.jwt}`,
          },
        }
      );

  

      if (response.status < 300) {
        return { data: undefined };
      }

      return { errors: [`${response.status} ${response.statusText}`] };
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        retry
      ) {
        const retryResult = await this.handle401Error(error, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.cancelBooking(bookingId, jwtData, false);
        }
        return retryResult;
      }
      return this.handleError(error);
    }
  }
}
