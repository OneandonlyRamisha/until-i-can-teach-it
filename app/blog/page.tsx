import type { Metadata } from "next";
import { Suspense } from "react";
import BlogClient from "./blogClient";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "Browse all articles by Luka — covering coding, philosophy, sales, AI, business, and self-improvement. Every post is written to be explained in plain terms.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "All Articles | Until I Can Teach It",
    description:
      "Browse all articles by Luka — covering coding, philosophy, sales, AI, business, and self-improvement.",
    url: "/blog",
  },
};

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
