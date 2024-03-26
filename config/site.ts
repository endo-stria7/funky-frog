export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Acme Inc',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Orders',
      href: '/orders',
    },
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'Customers',
      href: '/customers',
    },
    {
      title: 'Analytics',
      href: '/analytics',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
};
