import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Until I Can Teach It",
  description:
    "A personal blog by Luka — writing about coding, philosophy, sales, AI, and business. If I can explain it clearly, I understand it.",
  alternates: { canonical: "/" },
};
import HeroSection from "@/sections/heroSection/heroSection";
import LatestPostsSection from "@/sections/latestPostsSection/latestPostsSection";
import TopicsSection from "@/sections/topicsSection/topicsSection";
import StartHereSection from "@/sections/startHereSection/startSection";
import AboutSection from "@/sections/aboutSection/aboutSection";

export default function Home() {
  return (
    <main className={styles.container}>
      <HeroSection />
      <LatestPostsSection />
      <TopicsSection />
      <StartHereSection />
      <AboutSection />
    </main>
  );
}
