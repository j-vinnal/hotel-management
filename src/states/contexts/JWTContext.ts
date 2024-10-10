import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {createContext} from 'react';

export interface IJWTContext {
  jwtResponse: IJWTResponse | undefined;
  setJwtResponse: (jwtResponse: IJWTResponse | undefined) => void;
}

export const JWTContext = createContext<IJWTContext | null>(null);
