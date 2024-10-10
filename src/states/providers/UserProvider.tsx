'use client';

import {IAppUserState} from '@/interfaces/IAppUserState';
import {jwtDecode} from 'jwt-decode';
import {useContext, useEffect, useState} from 'react';
import {JWTContext} from '../contexts/JWTContext';
import {UserContext} from '../contexts/UserContext';

export default function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const [user, setUser] = useState<IAppUserState | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  useEffect(() => {
    if (jwtResponse) {
      try {
        const decodedJwt = jwtDecode(jwtResponse.jwt) as any;

        setUser({
          id: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
          firstName: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
          lastName: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
          email: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          personalCode: decodedJwt['PersonalCode'],
        });
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [jwtResponse, setJwtResponse, backendUrl]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}
