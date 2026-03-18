import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Until I Can Teach It",
  description:
    "A philosophy journal by Luka — essays on stoicism, ethics, metaphysics, and the questions philosophy has always asked. If I can explain it clearly, I understand it.",
  alternates: { canonical: "/" },
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

export default function Home() {
  return (
    <main className={styles.container}>
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
