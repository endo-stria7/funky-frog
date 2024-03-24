import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import NextLogo from './NextLogo';

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface MainNavProps {
  items?: NavItem[];
}

export default function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <NextLogo />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium text-muted-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80',
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
