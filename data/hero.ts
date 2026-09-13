export type Media = {
  kind: "video" | "image";
  // Path under public/, e.g. "/media/hero/bristol-harbourside.mp4".
  // Until a file exists at this path, the site shows a placeholder
  // naming the path, so dropping the file in is all that's needed.
  src: string;
  // Optional still shown before a video loads.
  poster?: string;
  alt: string;
};

export const heroMedia: Media = {
  kind: "video",
  src: "/media/hero/bristol-harbourside.mp4",
  poster: "/media/hero/bristol-harbourside.jpg",
  alt: "Bristol's Floating Harbour with the coloured houses of Cliftonwood on the hill behind",
};
