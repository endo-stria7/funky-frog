'use server';

import { cache } from 'react';
import {
  Copy,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  SquareArrowOutUpRight,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  viewProductRevenueAndProfit,
  viewProductWithProfitRank,
} from '@/supabase/queries';
import { type Database } from '@/types/supabase';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ChartBarOverviewProducts from '../charts/products-overview';
import ChartsProductsRevenue from '../charts/products-revenue';

async function getData() {
  const result = Promise.all([
    viewProductRevenueAndProfit(),
    viewProductWithProfitRank({ from: 0, to: 9 }),
  ]);
  return result;
}
const cachedProductRevenueAndProfitData = cache(
  (
    data: Database['public']['Views']['product_revenue_and_profit']['Row'][],
  ) => {
    return data.map((info) => ({
      name: info.product_name!,
      total_profit: Math.floor(info.total_profit!),
      profit_margin: Math.floor(info.profit_margin!),
      total_revenue: Math.floor(info.total_revenue!),
    }));
  },
);
const cachedProductRevenueData = cache(
  (
    data: Database['public']['Views']['product_revenue_and_profit']['Row'][],
  ) => {
    return data.map((info) => ({
      name: info.product_name!,
      profit_margin: Math.floor(info.profit_margin!),
    }));
  },
);

export default async function ProductsOverviewPage() {
  const [productRevenueAndProfit, productProfitRank] = await getData();
  const formattedRevenueAndProfit = cachedProductRevenueAndProfitData(
    productRevenueAndProfit,
  );
  const formattedRevenue = cachedProductRevenueData(productRevenueAndProfit);

  return (
    <main className="flex-1 flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue and Profit</CardTitle>
          <CardDescription>{`You have ${String(formattedRevenueAndProfit.length)} products.`}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartsProductsRevenue data={formattedRevenueAndProfit} />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
            <CardDescription>{`You have ${String(formattedRevenueAndProfit.length)} products.`}</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartBarOverviewProducts data={formattedRevenue} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Quickview Top 10 Profit Margin
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Product ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  View Detail
                </span>
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="flex font-semibold justify-between">
                <span>Product Details</span>
                <span>Margins</span>
              </div>
              <ol className="grid gap-3 list-decimal">
                {productProfitRank.map((item) => {
                  return (
                    <li
                      className="flex items-center justify-between"
                      key={item.product_id}
                    >
                      <span className="text-muted-foreground">
                        {`${item.product_name!} x `}
                        <span>{item.quantity_per_unit}</span>
                      </span>
                      <span>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }).format(item.profit_margin!)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Product</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Product</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
