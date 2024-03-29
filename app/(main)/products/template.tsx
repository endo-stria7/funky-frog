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

function _CTAButton() {
  return <Button className="mt-4">Add Product</Button>;
}

function _EmptyContent({
  heading = 'Inventory',
  title = 'You have no products',
  description = 'You can start selling as soon as you add a product.',
  CTAButton = _CTAButton,
}: {
  heading?: string;
  title?: string;
  description?: string;
  CTAButton?: React.ElementType;
}) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{heading}</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <CTAButton />
        </div>
      </div>
    </>
  );
}

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

export default function ProductTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  function routeToQueryString(queryString: string[][]) {
    return `?${queryString.map(([key, value]) => (key && value ? `${key}=${value}` : '')).join('&')}`;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header> */}
          {children}
        </main>
      </div>
    </div>
  );
}
