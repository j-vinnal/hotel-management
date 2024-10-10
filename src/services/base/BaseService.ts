import {IResultObject} from '@/interfaces/auth/IResultObject';
import Axios, {AxiosInstance} from 'axios';

export abstract class BaseService {
  private static hostBaseURL = 'http://localhost:5172/api/';
  protected axios: AxiosInstance;

  protected constructor(baseURL: string) {
    this.axios = Axios.create({
      baseURL: BaseService.hostBaseURL + baseURL,
      headers: {
        common: {
          'Content-Type': 'application/json',
        },
      },
    });

    // Optionally, you can write interceptors here
    this.axios.interceptors.request.use(request => {
      return request;
    });
  }

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
