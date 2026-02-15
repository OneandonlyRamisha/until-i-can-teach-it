import styles from "./page.module.css";
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
