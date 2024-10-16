'use client';

import {UserContext} from '@/states/contexts/UserContext';
import {useRouter} from 'next/navigation';
import {useContext, useEffect} from 'react';
import Spinner from './Spinner';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const {user} = useContext(UserContext)!;
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
