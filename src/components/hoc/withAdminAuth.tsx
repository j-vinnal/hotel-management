'use client';

import {UserContext} from '@/states/contexts/UserContext';
import {Admin} from '@/utils/roleConstants';
import {useRouter} from 'next/navigation';
import {useContext, useEffect} from 'react';
import Spinner from './Spinner';

const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithAdminAuth = (props: P) => {
    const {user} = useContext(UserContext)!;
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

  ComponentWithAdminAuth.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAdminAuth;
};

export default withAdminAuth;
