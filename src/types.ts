export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

// Socials
import type { SocialIcons } from "./assets/socialIcons";

export type Social = {
  name: SocialIcons;
  href: string;
  linkTitle: string;
  active: boolean;
};

export type SocialObjects = Social[];
