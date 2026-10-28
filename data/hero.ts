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

// Portrait photo, used uncropped at 960×1259 with a 640×840 copy. The
// hero frame in app/page.tsx matches its shape.
export const heroMedia: Media = {
  kind: "image",
  src: "/media/hero/portrait.webp",
  srcSet: "/media/hero/portrait-sm.webp 640w, /media/hero/portrait.webp 960w",
  alt: "Mahesh Nanavare",
};
