'use server';

import { cache } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  viewProductRevenueAndProfit,
  viewProductWithProfitRank,
} from '@/supabase/queries';
import { type Database } from '@/types/supabase';
import { sliceIntoChunks } from '@/lib/utils';
import ChartBarOverviewProducts from '../charts/products-overview';
import ChartsProductsRevenue from '../charts/products-revenue';
import OverviewProductsQuickView from './quick-view';

async function getData() {
  const result = Promise.all([
    viewProductRevenueAndProfit(),
    viewProductWithProfitRank(),
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
  const chunkedProductProfitRank = sliceIntoChunks(productProfitRank, 10);
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

        <OverviewProductsQuickView {...chunkedProductProfitRank} />
      </div>
    </main>
  );
}
