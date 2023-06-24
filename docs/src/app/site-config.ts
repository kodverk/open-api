export const siteConfig = {
  name: "Kodverk",
  description:
    "Kodverk is a community of developers, designers, and other tech enthusiasts in Umeå, Sweden. We are a non-profit organization that aims to promote and support the local tech community.",
  mainNav: [
    {
      title: "Documentation",
      href: "/docs/introduction",
    },
  ],
  sidebarNav: [
    {
      title: "Monorepo Setup",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          items: [],
        },
        {
          title: "Release",
          href: "/docs/release",
          items: [],
        },
      ],
    },
    {
      title: "Umeå Open API",
      items: [
        {
          title: "Public Beaches",
          href: "/docs/public-beaches",
          items: [],
        },
      ],
    },
  ],
  links: {
    twitter: "https://twitter.com/kodverk",
    github: "https://github.com/kodverk/umea-open-api",
    docs: "/docs",
  },
};

export type SiteConfig = typeof siteConfig;
