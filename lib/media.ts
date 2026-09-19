import fs from "fs";
import path from "path";
import type { Media } from "@/data/hero";
import type { Project, Screenshot } from "@/data/projects";

export type ResolvedMedia = Media & { ready: boolean; posterReady: boolean };

export type ResolvedScreenshot = Screenshot & {
  src: string;
  thumb: string;
  url: string;
  ready: boolean;
  // The same page on the old site, when there's one to compare against.
  before: string | null;
};

// Build-time check for whether a media file has been added to public/.
// Missing files render as a labelled placeholder instead of a broken tag.
function existsInPublic(src: string | undefined) {
  if (!src) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export function resolveMedia(media: Media): ResolvedMedia {
  return {
    ...media,
    ready: existsInPublic(media.src),
    posterReady: existsInPublic(media.poster),
  };
}

export function resolveScreenshots(project: Project): ResolvedScreenshot[] {
  const origin = new URL(project.liveUrl).host;

  return project.screenshots.map((shot, i) => {
    const src = `/media/projects/${project.slug}/${i + 1}.webp`;
    const thumb = `/media/projects/${project.slug}/${i + 1}-sm.webp`;
    const before = `/media/projects/${project.slug}/${i + 1}-before.webp`;
    return {
      ...shot,
      src,
      thumb: existsInPublic(thumb) ? thumb : src,
      url: origin + shot.page,
      ready: existsInPublic(src),
      before: existsInPublic(before) ? before : null,
    };
  });
}
