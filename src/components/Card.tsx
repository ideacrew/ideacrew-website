import { slugifyStr } from "@/utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

// Accept a minimal subset used by this component so it can render entries from
// multiple collections (e.g. "blog" and "news") without strict coupling.
type FrontmatterMinimal = {
  title: string;
  description: string;
  pubDatetime: Date;
  modDatetime?: Date | null;
};

export interface Props {
  href?: string;
  frontmatter: FrontmatterMinimal;
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="text-skin-accent inline-block text-lg font-medium decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <p>{description}</p>
    </li>
  );
}
