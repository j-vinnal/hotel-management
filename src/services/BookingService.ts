import {IResultObject} from '@/interfaces/auth/IResultObject';
import {IBooking} from '@/interfaces/domain/IBooking';
import {IJWTResponse} from '@/interfaces/IJWTResponse';
import axios from 'axios';
import {BaseEntityService} from './base/BaseEntityService';

/**
 * BookingService provides methods to interact with custom booking-related endpoints.
 * It extends BaseEntityService to leverage common CRUD operations and JWT handling.
 */
export default class BookingService extends BaseEntityService<IBooking> {
  /**
   * Constructs a new instance of BookingService.
   *
   * @param {(data: IJWTResponse | undefined) => void} setJwtResponse - Function to update JWT response.
   */
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

  /**
   * Fetches a list of bookings, typically used by admin users.
   *
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [viewAll=true] - Determines the scope of bookings returned:
   * - `true`: Returns all bookings.
   * - `false`: Returns only the bookings associated with the current user.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<IBooking[]>>} A promise resolving to the result object containing bookings.
   */
  async getBookings(
    jwtData: IJWTResponse,
    viewAll: boolean = true,
    retry: boolean = true
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
      return {data: response.data};
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const retryResult = await this.handle401Error(error, jwtData);
        if (retryResult === null) {
          // Retry the request once with the new JWT
          return this.getBookings(jwtData, viewAll, false);
        }
        return retryResult;
      }
      return this.handleError(error);
    }
  }

  /**
   * Cancels a booking.
   *
   * @param {string} bookingId - The ID of the booking to cancel.
   * @param {IJWTResponse} jwtData - The JWT data for authentication.
   * @param {boolean} [retry=true] - Whether to retry the request on 401 error.
   * @returns {Promise<IResultObject<void>>} A promise resolving to the result object.
   */
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
        return {data: undefined};
      }

      return {errors: [`${response.status} ${response.statusText}`]};
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
