import {IResultObject} from '@/interfaces/auth/IResultObject';
import Axios, {AxiosInstance} from 'axios';

/**
 * BaseService provides common functionality for making HTTP requests using Axios.
 * It includes error handling and request interceptors.
 */
export abstract class BaseService {
  private static hostBaseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL + '/api/' || 'http://localhost:5172/api/';
  protected axios: AxiosInstance;

  /**
   * Constructs a new instance of BaseService.
   *
   * @param {string} baseURL - The base URL for the service endpoints.
   */
  protected constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL: BaseService.hostBaseURL + baseURL,
      headers: {
        common: {
          'Content-Type': 'application/json',
          'X-Road-Client': 'EE/GOV/12345678/hotel-x', 
        },
      },
    });

    // Optionally, you can write interceptors here
    this.axios.interceptors.request.use(request => {
      return request;
    });
  }

  /**
   * Handles errors from Axios requests.
   *
   * @param {any} e - The error object from Axios.
   * @returns {IResultObject<any>} An object containing error messages.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleError(e: any): IResultObject<any> {
    let errorMessage = 'An unknown error occurred';
    if (e.response) {
      errorMessage = `${e.response.data?.error || 'No error message provided'} - ${e.response.status} ${e.response.statusText}`;
    } else if (e.request) {
      errorMessage = 'No response received from server. Please try again later';
    } else {
      errorMessage = e.message;
    }

    return {errors: [errorMessage]};
  }
}
