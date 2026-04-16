import GithubSlugger from "github-slugger";

export function createHeadingId(text: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(text.trim());
}

