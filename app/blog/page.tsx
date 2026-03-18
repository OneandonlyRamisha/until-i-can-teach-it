import type { Metadata } from "next";
import { Suspense } from "react";
import BlogClient from "./blogClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://untilicanteachit.com";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Browse all philosophy essays by Luka — stoicism, ethics, metaphysics, epistemology, and the big questions philosophy has always asked. Written to understand, not to impress.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Philosophy Essays | Until I Can Teach It",
    description:
      "Browse all philosophy essays by Luka — stoicism, ethics, metaphysics, epistemology, and the big questions philosophy has always asked.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philosophy Essays | Until I Can Teach It",
    description:
      "Browse all philosophy essays by Luka — stoicism, ethics, metaphysics, epistemology, and the big questions philosophy has always asked.",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Philosophy Essays — Until I Can Teach It",
  description:
    "All philosophy essays by Luka, covering stoicism, ethics, metaphysics, epistemology, and more.",
  url: `${siteUrl}/blog`,
  author: {
    "@type": "Person",
    name: "Luka",
    url: `${siteUrl}/about`,
  },
  inLanguage: "en-US",
};

export default function Blog() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogClient />
      </Suspense>
    </>
  );
}
