'use client';

import {IAppUserState} from '@/interfaces/IAppUserState';
import {jwtDecode} from 'jwt-decode';
import {createContext, useContext, useEffect, useState} from 'react';
import {JWTContext} from './JWTContext';

export interface IUserContext {
  user: IAppUserState | undefined;
  setUser: (user: IAppUserState | undefined) => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

/**
 * UserProvider component that provides user-related context to its children.
 * The user state is populated using claims from the JWT.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the context provider.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
export default function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {jwtResponse} = useContext(JWTContext)!;
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
          role: decodedJwt[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
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
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
