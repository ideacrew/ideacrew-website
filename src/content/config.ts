import { defineCollection, z } from "astro:content";

const workCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    client: z.string(),
    description: z.string(),
    summary: z.string().optional().default(""),
    image: z
      .object({
        src: z.string().default("/images/about-us.svg"),
        alt: z.string().default("Placeholder image"),
      })
      .optional()
      .default({
        src: "/images/about-us.svg",
        alt: "Placeholder image",
      }),
    sortOrder: z.number().default(999),
  }),
});

const leadersCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    position: z.string(),
    active: z.boolean().default(true),
    photo: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    linkedin: z.string().url().optional().nullable().default(""),
    sortOrder: z.number().default(999),
  }),
});

const newsCollection = defineCollection({
  type: "content",
  schema: z.object({
    author: z.string(),
    pubDatetime: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    modDatetime: z.date().optional().nullable(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const jobPostings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.string(),
    location: z.string(),
    active: z.boolean(),
    description: z.string(),
    applicationUrl: z.string(),
    sortOrder: z.number(),
    postedDate: z.date(),
    featured: z.boolean().default(false),
    salary: z.object({
      salaryLow: z.number().transform(num => num.toLocaleString()),
      salaryHigh: z.number().transform(num => num.toLocaleString()),
    }),
  }),
});

const siteCollection = defineCollection({
  type: "content",
  schema: z.object({
    siteName: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  work: workCollection,
  leaders: leadersCollection,
  news: newsCollection,
  careers: jobPostings,
  site: siteCollection,
};
