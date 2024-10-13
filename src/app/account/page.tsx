'use client';

import withAuth from '@/components/hoc/withAuth';
import MainLayout from '@/components/layouts/MainLayout';

const AccountPage = () => {
  return (
    <MainLayout>
      <h2>Upcoming bookings</h2>
      <div className="pt-4">
        <table className="table">
          <thead>
            <tr>
              <th>RoomNumber</th>
              <th>QuestFirstName</th>
              <th>QuestLastName</th>

              <th>StartDate</th>
              <th>EndDate</th>
              <th>IsCancelled</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>105</td>
              <td>J&#xFC;ri</td>
              <td>Vinnal</td>
              <td>12.10.2024 15:58:00</td>
              <td>13.10.2024 15:58:00</td>
              <td>
                <input className="check-box" disabled checked type="checkbox" />
              </td>

              <td>
                <a href="/Bookings/Edit/bb28d136-5388-4079-bde3-ff55bae623d5">
                  Edit
                </a>
                |
                <a href="/Bookings/Details/bb28d136-5388-4079-bde3-ff55bae623d5">
                  Details
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default withAuth(AccountPage);
