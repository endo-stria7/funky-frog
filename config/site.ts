export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Foobar',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Dashabord',
      href: '/dashboard',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
};
