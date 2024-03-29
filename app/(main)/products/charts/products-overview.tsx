'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const dataDefault = [
  { name: 'Côte de Blaye', profit_margin: 141396 },
  { name: 'Schoggi Schokolade', profit_margin: 15099 },
  { name: 'Carnarvon Tigers', profit_margin: 29171 },
  { name: 'Thüringer Rostbratwurst', profit_margin: 80368 },
  { name: 'Louisiana Hot Spiced Okra', profit_margin: 3383 },
  { name: "Grandma's Boysenberry Spread", profit_margin: 7136 },
  { name: 'Mishi Kobe Niku', profit_margin: 7226 },
  { name: 'Alice Mutton', profit_margin: 32698 },
  { name: 'Manjimup Dried Apples', profit_margin: 41819 },
  { name: 'Gudbrandsdalsost', profit_margin: 21942 },
  { name: 'Vegie-spread', profit_margin: 16701 },
  { name: 'Raclette Courdavault', profit_margin: 71155 },
  { name: 'Northwoods Cranberry Sauce', profit_margin: 12771 },
  { name: "Sirop d'érable", profit_margin: 14352 },
  { name: 'Rössle Sauerkraut', profit_margin: 25696 },
  { name: 'Tarte au sucre', profit_margin: 47234 },
  { name: 'Mascarpone Fabioli', profit_margin: 8404 },
  { name: 'Pâté chinois', profit_margin: 17426 },
  { name: "Sir Rodney's Marmalade", profit_margin: 22563 },
  { name: 'Ikura', profit_margin: 20867 },
  { name: 'Perth Pasties', profit_margin: 20574 },
  { name: 'Queso Manchego La Pastora', profit_margin: 12257 },
  { name: 'Gnocchi di nonna Alice', profit_margin: 42593 },
  { name: "Chef Anton's Cajun Seasoning", profit_margin: 8567 },
  { name: 'Ipoh Coffee', profit_margin: 23526 },
  { name: 'Tofu', profit_margin: 7991 },
  { name: 'Wimmers gute Semmelknödel', profit_margin: 21957 },
  { name: 'Mozzarella di Giovanni', profit_margin: 24900 },
  { name: 'Camembert Pierrot', profit_margin: 46825 },
  { name: 'Escargots de Bourgogne', profit_margin: 5881 },
  { name: "Uncle Bob's Organic Dried Pears", profit_margin: 22044 },
  { name: "Gustaf's Knäckebröd", profit_margin: 7122 },
  { name: 'Boston Crab Meat', profit_margin: 17910 },
  { name: 'Sasquatch Ale', profit_margin: 6350 },
  { name: 'Maxilaku', profit_margin: 9244 },
  { name: 'Chartreuse verte', profit_margin: 12294 },
  { name: 'Flotemysost', profit_margin: 19551 },
  { name: 'Longlife Tofu', profit_margin: 2432 },
  { name: 'Gumbär Gummibärchen', profit_margin: 19849 },
  { name: 'Lakkalikööri', profit_margin: 15760 },
  { name: 'Chocolade', profit_margin: 1368 },
  { name: 'Nord-Ost Matjeshering', profit_margin: 13424 },
  { name: 'Pavlova', profit_margin: 17215 },
  { name: 'Louisiana Fiery Hot Pepper Sauce', profit_margin: 13869 },
  { name: 'Gula Malacca', profit_margin: 9915 },
  { name: 'Laughing Lumberjack Lager', profit_margin: 2396 },
  { name: 'Inlagd Sill', profit_margin: 13458 },
  { name: 'NuNuCa Nuß-Nougat-Creme', profit_margin: 3704 },
  { name: "Chef Anton's Gumbo Mix", profit_margin: 5347 },
  { name: 'Chai', profit_margin: 12788 },
  { name: 'Outback Lager', profit_margin: 10672 },
  { name: 'Steeleye Stout', profit_margin: 13643 },
  { name: 'Gravad lax', profit_margin: 2688 },
  { name: 'Singaporean Hokkien Fried Mee', profit_margin: 8574 },
  { name: 'Queso Cabrales', profit_margin: 12901 },
  { name: 'Chang', profit_margin: 16355 },
  { name: 'Ravioli Angelo', profit_margin: 7661 },
  { name: "Sir Rodney's Scones", profit_margin: 9103 },
  { name: 'Gorgonzola Telino', profit_margin: 14920 },
  { name: 'Genen Shouyu', profit_margin: 1784 },
  { name: 'Original Frankfurter grüne Soße', profit_margin: 9171 },
  { name: 'Filo Mix', profit_margin: 3232 },
  { name: 'Valkoinen suklaa', profit_margin: 3437 },
  { name: 'Röd Kaviar', profit_margin: 3997 },
  { name: "Jack's New England Clam Chowder", profit_margin: 8680 },
  { name: 'Tunnbröd', profit_margin: 4601 },
  { name: 'Spegesild', profit_margin: 5883 },
  { name: 'Zaanse koeken', profit_margin: 3958 },
  { name: 'Rogede sild', profit_margin: 4338 },
  { name: 'Scottish Longbreads', profit_margin: 8713 },
  { name: 'Tourtière', profit_margin: 4728 },
  { name: 'Teatime Chocolate Biscuits', profit_margin: 5862 },
  { name: 'Rhönbräu Klosterbier', profit_margin: 8177 },
  { name: 'Konbu', profit_margin: 4960 },
  { name: 'Guaraná Fantástica', profit_margin: 4504 },
  { name: 'Aniseed Syrup', profit_margin: 3043 },
  { name: 'Geitost', profit_margin: 1648 },
];

function CustomizedAxisTick({
  x,
  y,
  stroke: _stroke,
  payload,
}: { [Key in string]: string | { value: string } }) {
  return (
    <g transform={`translate(${x as string},${y as string})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {(payload as { value: string }).value}
      </text>
    </g>
  );
}
export default function ChartBarOverviewProducts({
  data = dataDefault,
}: {
  data: { name: string; profit_margin: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // height={60}
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) =>
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(value)
          }
        />
        <Tooltip />
        <Bar
          dataKey="profit_margin"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>

      {/* <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
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
        <Line type="monotone" dataKey="profit_margin" stroke="#8884d8" />
      </LineChart> */}
    </ResponsiveContainer>
  );
}
