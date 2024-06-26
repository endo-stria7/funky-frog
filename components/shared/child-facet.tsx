import Link from 'next/link';
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
import { type Icon } from '@/components/icons';

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
          {/* <Button className="mt-4">Add Product</Button> */}
          <CTAButton />
        </div>
      </div>
    </>
  );
}
export default function ChildFacet({
  views,
  searchParams,
  children,
}: {
  views: {
    title: string;
    queryString: string[];
    icon: Icon;
    notiCount?: number;
  }[];
  searchParams: Record<string, string>;
  children: React.ReactNode;
}) {
  function routeToQueryString(queryString: string[]) {
    const params = new URLSearchParams(searchParams);
    params.set(queryString[0]!, queryString[1]!);
    return `?${params.toString()}`;
  }
  function isActiveTabQueryString(queryString: string[]) {
    const { 0: key, 1: value } = queryString;
    return value === new URLSearchParams(searchParams).get(key!);
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {views.map((v, index) => {
                return (
                  <Link
                    key={index}
                    href={routeToQueryString(v.queryString)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                      isActiveTabQueryString(v.queryString)
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground',
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
          {children}
        </main>
      </div>
    </div>
  );
}
