'use client';

import useAccountActions from '@/hooks/identity/useAccountActions';
import { UserContext } from '@/states/contexts/UserContext';
import { Admin } from '@/utils/roleConstants';

import Link from 'next/link';
import { useContext, useEffect } from 'react';

export default function Identity() {
  const { user } = useContext(UserContext)!;
  return user ? <LoggedIn /> : <LoggedOut />;
}

const LoggedIn = () => {
  const { logoutAccount } = useAccountActions();

  
  const { user } = useContext(UserContext)!;

  //for debugging
  useEffect(() => {
    console.log(JSON.stringify(user, null, 2));
  }, [user]);

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          href="/account"
          className="nav-link text-dark d-flex align-items-center nav-item-height">
          Hello {user!.firstName} {user!.lastName}!
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-dark d-flex align-items-center nav-item-height"
          href="#"
          id="userDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <span
            className="rounded-circle bg-primary text-white d-inline-block text-center"
            style={{ width: '30px', height: '30px', lineHeight: '30px' }}>
            {user!.firstName.charAt(0)}
          </span>
        </a>
        <ul
          className="dropdown-menu"
          aria-labelledby="userDropdown"
          style={{ position: 'absolute' }}>
          {user!.role === Admin && (
            <li>
              <Link href="/admin" className="dropdown-item" title="Admin">
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link href="/account" className="dropdown-item" title="Manage">
              Account
            </Link>
          </li>
          <li>
            <Link
              onClick={logoutAccount}
              href="/"
              className="dropdown-item"
              title="Logout">
              Logout
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

const LoggedOut = () => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          href="/register"
          className="nav-link text-dark d-flex align-items-center nav-item-height">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link
          href="/login"
          className="nav-link text-dark d-flex align-items-center nav-item-height">
          Login
        </Link>
      </li>
    </ul>
  );
};
