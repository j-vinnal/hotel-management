'use client';

import React from 'react';
import {HotelProvider} from './HotelContext';
import JWTProvider from './JWTContext';
import RoomProvider from './RoomContext';
import SearchProvider from './SearchContext';
import UserProvider from './UserContext';

/**
 * Context component that wraps its children with various context providers.
 * This component ensures that all necessary contexts are available to the application.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the context providers.
 * @returns {JSX.Element} The context-wrapped component tree.
 */
const Context: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <JWTProvider>
      <UserProvider>
        <SearchProvider>
          <RoomProvider>
            <HotelProvider>{children}</HotelProvider>
          </RoomProvider>
        </SearchProvider>
      </UserProvider>
    </JWTProvider>
  );
};

export default Context;
