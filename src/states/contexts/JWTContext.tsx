'use client';

import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {createContext, useState, useContext} from 'react';

export interface IJWTContext {
  jwtResponse: IJWTResponse | undefined;
  setJwtResponse: (jwtResponse: IJWTResponse | undefined) => void;
}

export const JWTContext = createContext<IJWTContext | undefined>(undefined);

/**
 * JWTProvider component that provides JWT-related context to its children.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the context provider.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
export default function JWTProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [jwtResponse, setJwtResponse] = useState<IJWTResponse | undefined>(
    undefined
  );

  return (
    <JWTContext.Provider value={{jwtResponse, setJwtResponse}}>
      {children}
    </JWTContext.Provider>
  );
}

export const useJWT = () => {
  const context = useContext(JWTContext);
  if (!context) {
    throw new Error('useJWT must be used within a JWTProvider');
  }
  return context;
};
