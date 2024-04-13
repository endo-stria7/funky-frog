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
      disabled: true,
    },
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'Customers',
      href: '/customers',
      disabled: true,
    },
    {
      title: 'Analytics',
      href: '/analytics',
      disabled: true,
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/endo-stria7/funky-frog',
    docs: 'https://ui.shadcn.com',
  },
};
