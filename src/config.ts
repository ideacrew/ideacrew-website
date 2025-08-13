import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "IdeaCrew, Inc.",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "IdeaCrew",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 133.64,
  height: 25.05,
};

export const SOCIALS: SocialObjects = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ideacrewinc/",
    linkTitle: "LinkedIn",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:info@ideacrew.com",
    linkTitle: "Email us",
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/ideacrewinc",
    linkTitle: "Twitter",
    active: false,
  },
];
