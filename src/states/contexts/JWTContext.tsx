'use client';

import { IJWTResponse } from '@/interfaces/IJWTResponse';
import { createContext, useState } from 'react';

export interface IJWTContext {
  jwtResponse: IJWTResponse | undefined;
  setJwtResponse: (jwtResponse: IJWTResponse | undefined) => void;
}

export const JWTContext = createContext<IJWTContext | undefined>(undefined);
export default function JWTProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [jwtResponse, setJwtResponse] = useState<IJWTResponse | undefined>(
    undefined
  );

  return (
    <JWTContext.Provider value={{ jwtResponse, setJwtResponse }}>
      {children}
    </JWTContext.Provider>
  );
}
