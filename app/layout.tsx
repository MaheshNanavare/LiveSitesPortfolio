import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const martian = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maheshnanavare.co.uk"),
  title: "Mahesh Nanavare — Software Engineer, Bristol",
  description:
    "Portfolio of Mahesh Nanavare, a software engineer in Bristol. MSc Computer Science, University of Bristol.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${martian.variable}`}>
      <body className="min-h-dvh flex flex-col font-sans text-[17px] leading-relaxed antialiased">
        <SiteNav />
        <main className="flex-1 w-full">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
