import {IBaseEntity} from './domain/IBaseEntity';

export interface IAppUserState extends IBaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  personalCode: string;
  role: string;
}