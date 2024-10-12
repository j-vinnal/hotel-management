'use client';

import { UserContext } from '@/states/contexts/UserContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useContext(UserContext)!;

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'Admin') {
    return null;
  }

  return (
    <div className="row g-4">
      <div
        className="col-12 col-lg-3 position-sticky"
        style={{ top: '128px', marginRight: '32px' }}>
        <div
          className="d-flex flex-column justify-content-between rounded-xl bg-light rounded-4 p-4"
          style={{ fontSize: '22px', color: '#763250' }}>
          <Link
            href="/admin"
            className={`text-left nav-link ${pathname === '/admin' ? 'text-bold' : ''} hover-bold`}>
            Manage hotel
          </Link>
          <Link
            href="/admin/rooms"
            className={`text-left nav-link ${pathname === '/admin/rooms' ? 'text-bold' : ''} hover-bold`}>
            Manage rooms
          </Link>
          <Link
            href="/admin/bookings"
            className={`text-left nav-link ${pathname === '/admin/bookings' ? 'text-bold' : ''} hover-bold`}>
            Manage bookings
          </Link>
        </div>
      </div>

      <div className="col pt-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
