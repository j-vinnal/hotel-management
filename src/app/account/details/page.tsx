'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';
import { useContext } from 'react';
import { UserContext } from '@/states/contexts/UserContext';

const AccountDetailsPage = () => {
  const { user } = useContext(UserContext)!;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <h2>Account Details</h2>
      <hr />

      <dl className="row">
        <dt className="col-sm-2">First Name</dt>
        <dd className="col-sm-10">{user.firstName}</dd>
        <dt className="col-sm-2">Last Name</dt>
        <dd className="col-sm-10">{user.lastName}</dd>
        <dt className="col-sm-2">Email</dt>
        <dd className="col-sm-10">{user.email}</dd>
        <dt className="col-sm-2">Role</dt>
        <dd className="col-sm-10">{user.role}</dd>
        <dt className="col-sm-2">Personal Code</dt>
        <dd className="col-sm-10">{user.personalCode}</dd>
      </dl>

      <div className="py-4">
        <p className="mb-4 fw-medium text-dark" style={{ fontSize: '22px' }}>
          For support or account deletion
        </p>
        <div className="d-flex flex-wrap justify-content-between">
          <a className="text-decoration-none" href="mailto:info@hotelx.com">
            info@hotelx.com
          </a>
          <a className="text-decoration-none" href="tel:+47 464 62 000">
            +47 464 62 000
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(AccountDetailsPage);
