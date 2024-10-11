'use client';

import useAccountActions from '@/hooks/identity/useAccountActions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { logoutAccount } = useAccountActions();
  const pathname = usePathname(); 

  return (
    <div className="row g-4">
      <div
        className="col-12 col-lg-3 position-sticky"
        style={{ top: '128px', marginRight: '32px' }}>
        <div
          className="d-flex flex-column justify-content-between rounded-xl bg-light rounded-4 p-4"
          style={{ height: '300px', fontSize: '22px', color: '#763250' }}>
          <Link
            href="/account"
            className={`text-left nav-link ${pathname === '/account' ? 'text-bold' : ''} hover-bold`}>
            Upcoming bookings
          </Link>
          <Link
            href="/account/previous-bookings"
            className={`text-left nav-link ${pathname === '/account/previous-bookings' ? 'text-bold' : ''} hover-bold`}>
            Previous bookings
          </Link>
          <Link
            href="/account/details"
            className={`text-left nav-link ${pathname === '/account/details' ? 'text-bold' : ''} hover-bold`}>
            Account details
          </Link>
          <Link
            href="/account/benefits"
            className={`text-left nav-link ${pathname === '/account/benefits' ? 'text-bold' : ''} hover-bold`}>
            Benefits
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

export default MainLayout;
