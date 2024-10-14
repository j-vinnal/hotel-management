'use client';

import useAccountActions from '@/hooks/identity/useAccountActions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import withAdminAuth from '../hoc/withAdminAuth';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { logoutAccount } = useAccountActions();

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
            className={`text-left nav-link ${pathname === '/admin' || pathname.includes('/admin/hotels') ? 'text-bold' : ''} hover-bold mb-3`}>
            Manage hotel
          </Link>
          <Link
            href="/admin/rooms"
            className={`text-left nav-link ${pathname.includes('/admin/rooms') ? 'text-bold' : ''} hover-bold mb-3`}>
            Manage rooms
          </Link>
          <Link
            href="/admin/bookings"
            className={`text-left nav-link ${pathname.includes('/admin/bookings') ? 'text-bold' : ''} hover-bold`}>
            Manage bookings
          </Link>

          <hr className='mb-3'/>
          <Link href="/account" className={'text-left nav-link hover-bold mb-3'}>
            My account
          </Link>

          <button
            onClick={logoutAccount}
            className="text-left nav-link hover-bold btn-text-left-align">
            Log out
          </button>
        </div>
      </div>

      <div className="col pt-4">{children}</div>
    </div>
  );
};

export default withAdminAuth(AdminLayout);
