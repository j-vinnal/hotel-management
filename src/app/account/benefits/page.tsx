import MainLayout from '@/components/layouts/MainLayout';

const AccountPage = () => {
  return (
    <MainLayout>
      <h2>Benefits</h2>
      <div className="pt-4">
        <div className="d-flex justify-content-between align-items-center pb-4">
          <p className="fw-medium text-dark" style={{ fontSize: '22px' }}>
            Upcoming bookings
          </p>
          <button className="btn btn-dark text-light mt-3 mt-md-0">
            Can't find your booking?
          </button>
        </div>
      </div>
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

export default AccountPage;
