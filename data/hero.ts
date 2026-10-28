export type Media = {
  kind: "video" | "image";
  // Path under public/, e.g. "/media/hero/portrait.webp".
  // Until a file exists at this path, the site shows a placeholder
  // naming the path, so dropping the file in is all that's needed.
  src: string;
  // Optional smaller copies for images, as an img srcset.
  srcSet?: string;
  // Optional still shown before a video loads.
  poster?: string;
  alt: string;
};

// Portrait photo cropped to 4:5 (960×1200, with a 640×800 copy), so the
// hero frame is taller than wide.
export const heroMedia: Media = {
  kind: "image",
  src: "/media/hero/portrait.webp",
  srcSet: "/media/hero/portrait-sm.webp 640w, /media/hero/portrait.webp 960w",
  alt: "Mahesh Nanavare",
};
