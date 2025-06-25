import { getAdminDashboardData } from './loaders';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
//this is the admin dashboard

export default async function AdminDashboard() {
  const {  guestorders } = await getAdminDashboardData();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sweet Treats</h1>
        <div className="text-sm text-gray-500">Bakery Admin</div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Orders Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold">$2,847</p>
            <p className="text-green-600 text-sm">+12% from yesterday</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold">47</p>
            <p className="text-green-600 text-sm">+8% from yesterday</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Total Customers</p>
            <p className="text-2xl font-bold">156</p>
            <p className="text-green-600 text-sm">+5% from yesterday</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Pending Orders</p>
            <p className="text-2xl font-bold">8</p>
            <p className="text-orange-600 text-sm">(2 urgent)</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <p className="text-sm text-gray-500">Today&apos;s bakery orders</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guestorders.map((order) => (
                <TableRow key={order.stripe_payment_intent_id}>
                  <TableCell>ORD-{order.stripe_payment_intent_id.slice(0, 3)}</TableCell>
                  <TableCell>{`${order.first_name} ${order.last_name}`}</TableCell>
                  {/* <TableCell>{order.cart?.map(item => `${item.name} x${item.quantity}`).join(', ') || 'N/A'}</TableCell> */}
                  {/* <TableCell>${order.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0}</TableCell> */}
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-white" style={{ backgroundColor: 'green' }}>
                      Completed
                    </span>
                  </TableCell>
                  <TableCell>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right">
            <Button>View All Orders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}