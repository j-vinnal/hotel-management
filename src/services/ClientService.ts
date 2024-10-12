import { IClient } from '@/interfaces/domain/IClient';
import { IJWTResponse } from '@/interfaces/IJWTResponse';
import { BaseEntityService } from './base/BaseEntityService';

export default class ClientService extends BaseEntityService<IClient> {
  //takes setJwtResponse method as parameter
  constructor(
    setJwtResponse: ((data: IJWTResponse | undefined) => void) | null
  ) {
    //sets base url
    super(
      'v1/clients',
      setJwtResponse as (data: IJWTResponse | undefined) => void
    );
  }

  // Additional methods
}
