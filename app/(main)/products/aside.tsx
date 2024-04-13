import Link from 'next/link';
import { LineChart, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const views = [
  {
    title: 'Overview',
    href: '/products/overview',
    queryString: [['filter', 'all']],
    icon: LineChart,
  },
  {
    title: 'Management',
    href: '/products/management',
    queryString: [[]],
    icon: Package,
    notiCount: 77,
  },
];

export default function ProductsAside() {
  function routeToQueryString(queryString: string[][]) {
    return `?${queryString.map(([key, value]) => (key && value ? `${key}=${value}` : '')).join('&')}`;
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {views.map((v) => {
              return (
                <Link
                  key={v.href}
                  href={v.href + routeToQueryString(v.queryString)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                    'text-muted-foreground',
                  )}
                >
                  <v.icon className="h-4 w-4" />
                  {v.title}
                  {v.notiCount ? (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {v.notiCount}
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
