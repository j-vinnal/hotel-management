'use client';

import { UserContext } from '@/states/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import Spinner from './Spinner';
import { Admin } from '@/utils/roleConstants';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { user } = useContext(UserContext)!;
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== Admin) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user || user.role !== Admin) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;