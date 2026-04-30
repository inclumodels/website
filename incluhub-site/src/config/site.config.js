/**
 * Global site configuration.
 * Update these values to change meta, branding, and navigation.
 */
export const siteConfig = {
  name: 'IncluHub',
  tagline: 'Your AI-Powered Digital Ecosystem',
  description: 'IncluHub — building the future of AI-driven digital experiences.',
  url: 'https://incluhub.com',
  email: 'contact@inclumodels.com',
  location: 'Hyderabad, India',

  nav: [
    { label: 'Model',                     href: '/models',      route: true  },
    { label: 'Brands',                    href: '/brands',      route: true  },
    { label: 'Creators',                  href: '/creators',    route: true  },
    { label: 'Blogs',                     href: '/blogs',       route: true  },
    { label: 'Join International Education', href: '/join-agency', route: true  },
    { label: 'Contact',                   href: '#contact',     route: false },
  ],

  socials: {
    instagram: '',
    linkedin: '',
    twitter: '',
  },
}
