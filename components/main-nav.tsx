'use client';

import Link from 'next/link';
import { Package2, Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from './ui/badge';

export default function MainNav({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'z-40 w-full sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6',
      )}
    >
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="hidden md:flex md:items-center md:space-x-2">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>
        {siteConfig.mainNav.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={Object.hasOwn(item, 'disabled') ? '' : item.href}
                className={cn(
                  'flex items-center text-sm font-medium',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                  Object.hasOwn(item, 'disabled') &&
                    'cursor-not-allowed opacity-60',
                )}
              >
                {item.title}
                {Object.hasOwn(item, 'disabled') && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-teal-500 border-teal-500"
                  >
                    WIP
                  </Badge>
                )}
              </Link>
            ),
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
            {siteConfig.mainNav.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn('hover:text-foreground')}
                  >
                    {item.title}
                    {Object.hasOwn(item, 'disabled') && (
                      <Badge variant="outline" className="ml-2">
                        WIP
                      </Badge>
                    )}
                  </Link>
                ),
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        {children}
      </div>
    </header>
  );
}
