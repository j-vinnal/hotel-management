'use client';

import React from 'react';
import RoomProvider from './RoomContext';

import UserProvider from './UserContext';

import JWTProvider from './JWTContext';
import SearchProvider from './SearchContext';

const Context: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <JWTProvider>
      <UserProvider>
        <SearchProvider>
          <RoomProvider>
            {children}
          </RoomProvider>
        </SearchProvider>
      </UserProvider>
    </JWTProvider>
  );
};

export default Context;
