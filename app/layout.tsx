import type { Metadata } from "next";
import { Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";

const notoSerifGeorgian = Noto_Serif_Georgian({
  variable: "--noto-serif-georgian",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://untilicanteachit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Until I Can Teach It",
    template: "%s | Until I Can Teach It",
  },
  description:
    "A personal blog by Luka — a self-taught developer writing about what he learns: coding, philosophy, sales, AI, and business. If I can explain it clearly, I understand it.",
  keywords: [
    "blog",
    "coding",
    "philosophy",
    "sales",
    "AI",
    "self-improvement",
    "full-stack development",
    "business",
    "learning",
  ],
  authors: [{ name: "Luka" }],
  creator: "Luka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Until I Can Teach It",
    title: "Until I Can Teach It",
    description:
      "A personal blog by Luka — writing about coding, philosophy, sales, AI, and business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Until I Can Teach It",
    description:
      "A personal blog by Luka — writing about coding, philosophy, sales, AI, and business.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSerifGeorgian.variable} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
