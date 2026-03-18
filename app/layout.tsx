import type { Metadata } from "next";
import { Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

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
    "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked. If I can explain it clearly, I understand it.",
  keywords: [
    "philosophy",
    "stoicism",
    "ethics",
    "metaphysics",
    "epistemology",
    "virtue ethics",
    "philosophy essays",
    "philosophy journal",
    "examined life",
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
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Until I Can Teach It",
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
