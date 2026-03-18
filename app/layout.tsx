import type { Metadata } from "next";
import { Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import PageLoader from "@/components/pageLoader/pageLoader";

const notoSerifGeorgian = Noto_Serif_Georgian({
  variable: "--noto-serif-georgian",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://untilicanteachit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Until I Can Teach It — A Philosophy Journal",
    template: "%s | Until I Can Teach It",
  },
  description:
    "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked. If I can explain it clearly, I understand it.",
  keywords: [
    "philosophy",
    "philosophy journal",
    "philosophy essays",
    "stoicism",
    "stoic philosophy",
    "ethics",
    "virtue ethics",
    "metaphysics",
    "epistemology",
    "existentialism",
    "philosophy of mind",
    "ancient philosophy",
    "Socrates",
    "examined life",
    "Luka",
  ],
  authors: [{ name: "Luka", url: `${siteUrl}/about` }],
  creator: "Luka",
  publisher: "Until I Can Teach It",
  applicationName: "Until I Can Teach It",
  category: "Philosophy",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Until I Can Teach It",
    title: "Until I Can Teach It — A Philosophy Journal",
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Until I Can Teach It — A Philosophy Journal",
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
    creator: "@untilicanteachit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Until I Can Teach It",
    url: siteUrl,
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
    author: {
      "@type": "Person",
      name: "Luka",
      url: `${siteUrl}/about`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?category={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className={notoSerifGeorgian.variable} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <PageLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
