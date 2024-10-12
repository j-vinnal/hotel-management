'use client';

import { IAppUserState } from '@/interfaces/IAppUserState';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { JWTContext } from './JWTContext';


export interface IUserContext {
  user: IAppUserState | undefined;
  setUser: (user: IAppUserState | undefined) => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export default function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { jwtResponse } = useContext(JWTContext)!;
  const [user, setUser] = useState<IAppUserState | undefined>(undefined);

  useEffect(() => {
    if (jwtResponse) {
      try {
        const decodedJwt = jwtDecode(jwtResponse.jwt) as any;
        setUser({
          id: decodedJwt[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
          firstName:
            decodedJwt[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
            ],
          lastName:
            decodedJwt[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
            ],
          email:
            decodedJwt[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ],
          personalCode: decodedJwt['PersonalCode'],
        });
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        setUser(undefined);
      }
    } else {
      setUser(undefined);
    }
  }, [jwtResponse]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
