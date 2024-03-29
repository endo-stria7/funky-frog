'use server';

import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { calculateProductStats } from '@/supabase/rpc';
import {
  viewCustomerRecentSales,
  viewEmployeeRecentSales,
} from '@/supabase/queries';

async function getData() {
  const result = Promise.all([
    calculateProductStats(),
    viewCustomerRecentSales(),
    viewEmployeeRecentSales(),
  ]);
  return result;
}
export default async function DashboardPage() {
  const [productStats, customerRecentSales, employeeRecentSales] =
    await getData();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`$${productStats.averagePrice.toString()}`}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{productStats.totalStock}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Recent Sales by Employees */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Required Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerRecentSales.map((customerRecent) => (
                  <TableRow key={customerRecent.customer_id}>
                    <TableCell>
                      <div className="font-medium">
                        {customerRecent.customer_name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {customerRecent.ship_address}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(customerRecent.order_date!).toDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(customerRecent.required_date!).toDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {`+${new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(customerRecent.total_sales!)}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Recent Sales by Employees */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {employeeRecentSales.map((employeeRecent) => {
              return (
                <div
                  className="flex items-center gap-4"
                  key={employeeRecent.employee_id}
                >
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      src={employeeRecent.photo_path ?? ''}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {employeeRecent
                        .full_name!.split(' ')
                        .map((str) => str.at(0))
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {employeeRecent.full_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {employeeRecent.title}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {`Order at ${formatDistance(
                      new Date(employeeRecent.order_date!),
                      new Date(),
                    )}`}
                  </div>
                  <div className="ml-auto font-medium">{`+${new Intl.NumberFormat(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    },
                  ).format(employeeRecent.total_sales!)}`}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
