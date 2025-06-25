import { getAdminDashboardData } from './loaders';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const { clients, guestorders } = await getAdminDashboardData();
  const userName = 'Lucy'; // Replace this later with dynamic user name if needed

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
     <Sidebar className="w-64 p-4 bg-white shadow-md">
        <Link href="#clients" className="block py-2 px-4 rounded hover:bg-gray-200 font-medium">Clients</Link>
        <Link href="#guest_orders" className="block py-2 px-4 rounded hover:bg-gray-200 font-medium">Guest Orders</Link>
     </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Welcome {userName}, to your board</h1>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="guest_orders">Guest Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {clients?.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">
                      {client.first_name} {client.last_name}
                    </h2>
                    <p>{client.email}</p>
                    <p className="text-sm text-gray-500">
                      Confirmed: {client.email_confirmed_at ? 'Yes' : 'No'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guest_orders">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {guestorders?.map((order, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">
                      {order.first_name} {order.last_name}
                    </h2>
                    <p>{order.email}</p>
                    <p className="text-sm text-gray-500">City: {order.city}</p>
                    <p className="text-sm text-gray-500">Order Status: Pending</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
