import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://ideacrew.com/", // replace this with your deployed domain
  author: "IdeaCrew, Inc.",
  desc: "IdeaCrew is a healthcare technology company that provides software solutions to the healthcare industry.",
  title: "IdeaCrew",
  ogImage: "ideacrew-og.jpg",
  lightAndDarkMode: false,
  postPerPage: 6,
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
    name: "X",
    href: "https://x.com/ideacrewinc",
    linkTitle: "X",
    active: false,
  },
];
