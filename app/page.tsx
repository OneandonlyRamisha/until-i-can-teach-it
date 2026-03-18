import type { Metadata } from "next";
import styles from "./page.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://untilicanteachit.com";

export const metadata: Metadata = {
  title: "Until I Can Teach It — A Philosophy Journal",
  description:
    "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked. If I can explain it clearly, I understand it.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Until I Can Teach It — A Philosophy Journal",
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked. If I can explain it clearly, I understand it.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Until I Can Teach It — A Philosophy Journal",
    description:
      "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked.",
  },
};

import HeroSection from "@/sections/heroSection/heroSection";
import MarqueeSection from "@/sections/marqueeSection/marqueeSection";
import LatestPostsSection from "@/sections/latestPostsSection/latestPostsSection";
import TopicsSection from "@/sections/topicsSection/topicsSection";
import ManifestoSection from "@/sections/manifestoSection/manifestoSection";
import QuoteSection from "@/sections/quoteSection/quoteSection";
import StartHereSection from "@/sections/startHereSection/startSection";
import AboutSection from "@/sections/aboutSection/aboutSection";
import CtaSection from "@/sections/ctaSection/ctaSection";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luka",
  url: `${siteUrl}/about`,
  sameAs: [
    "https://www.linkedin.com/in/luka-ramishvili-72550035b/",
    "https://www.instagram.com/ramishaluka/",
    "https://github.com/OneandonlyRamisha",
  ],
  jobTitle: "Philosophy Writer",
  description:
    "Philosophy writer and the author of Until I Can Teach It — a journal of essays on stoicism, ethics, metaphysics, and more.",
};

export default function Home() {
  return (
    <main className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection />
      <MarqueeSection />
      <LatestPostsSection />
      <TopicsSection />
      <ManifestoSection />
      <QuoteSection />
      <StartHereSection />
      <AboutSection />
      <CtaSection />
    </main>
  );
}
