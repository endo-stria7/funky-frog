'use client';

import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';

export default function ChartsProductsRevenue({
  data,
}: {
  data?: Record<string, unknown>[];
}) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 25,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value: number) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(value)
          }
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="total_profit"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="total_revenue"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
