'use client';

import {IJWTResponse} from '@/interfaces/IJWTResponse';
import {JWTContext} from '@/states/contexts/JWTContext';
import {useState} from 'react';

export default function JWTProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [jwtResponse, setJwtResponse] = useState<IJWTResponse | undefined>(undefined);

  return <JWTContext.Provider value={{jwtResponse, setJwtResponse}}>{children}</JWTContext.Provider>;
}
