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

// Portrait video (720×1280), so the hero frame is taller than wide.
export const heroMedia: Media = {
  kind: "video",
  src: "/media/hero/Bristol_suspension_bridge_Cons.mp4",
  alt: "The Clifton Suspension Bridge in Bristol being built across the Avon Gorge",
};
