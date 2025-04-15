
import LogoutButton from "@/utils/logoutbtn";

import { getUserInfo } from './actions';

export default async function UserDashboard() {
  const info = await getUserInfo();

  if (!info) {
    return <div>Error loading profile. Please try again.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">Your Profile</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {info.first_name} {info.last_name}</p>
        <p><strong>Email:</strong> {info.email}</p>
        <p><strong>Verified:</strong> {info.email_confirmed_at ? 'Yes' : 'No'}</p>
      </div>
      <br />
      <LogoutButton />
    </div>
  );
}