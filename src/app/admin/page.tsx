'use client';

import withAdminAuth from '@/components/hoc/withAdminAuth';
import AdminLayout from '@/components/layouts/AdminLayouts';

const AdminPage = () => {
  return (
    <AdminLayout>
      <h2>Manage hotel</h2>
      <div className="pt-4">
        <p>
          <a href="/Hotels/Create">Create New</a>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Luxury Stay</td>
              <td>123 Luxury Lane</td>
              <td>123-456-7890</td>
              <td>contact@luxurystay.com</td>
              <td>
                <a href="/Hotels/Edit/5ac3a4e0-2c97-444f-88f8-a1fe7cbdf94b">
                  Edit
                </a>
                |
                <a href="/Hotels/Details/5ac3a4e0-2c97-444f-88f8-a1fe7cbdf94b">
                  Details
                </a>
                |
                <a href="/Hotels/Delete/5ac3a4e0-2c97-444f-88f8-a1fe7cbdf94b">
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(AdminPage);
