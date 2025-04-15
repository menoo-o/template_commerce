import { getAdminDashboardData } from './actions';
import LogoutButton from '@/utils/logoutbtn';

export default async function AdminDashboard() {
  const clients = await getAdminDashboardData();

  if (!clients.length) {
    return <div>No users found or error loading data.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border p-2">{client.first_name}</td>
              <td className="border p-2">{client.last_name}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">
                {client.email_confirmed_at ? 'Yes' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <LogoutButton />
    </div>
  );
}