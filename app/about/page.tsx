import styles from "./page.module.css";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function About() {
  return (
    <section className={styles.section}>
      <Link href={"/"} className={styles.goBackContainer}>
        <FaArrowLeftLong className={styles.icon} />
        <p className={styles.goBack}>Home</p>
      </Link>

      <h2 className={styles.header}>Hey, I&apos;m Luka</h2>
      <span className={styles.line}></span>

      <div className={styles.content}>
        <p className={styles.paragraph}>
          I&apos;m a self-taught full-stack developer who&apos;s been deep in
          the code for the past three years. No bootcamp, no CS degree—just
          curiosity, Stack Overflow, and way too many browser tabs open at once.
        </p>

        <p className={styles.paragraph}>
          While learning to build software, I also built a few small businesses
          along the way. Nothing that changed my life overnight, but each one
          taught me something valuable about shipping products, talking to
          users, and figuring out what actually matters versus what just feels
          productive.
        </p>

        <h2 className={styles.subheader}>What I&apos;m into</h2>
        <p className={styles.paragraph}>
          These days I focus on full-stack development—building things from the
          database to the UI and everything in between. I&apos;m also
          increasingly fascinated by AI and how it&apos;s changing the way we
          build software. Not just using ChatGPT to write code, but actually
          understanding how these models work and integrating them into real
          applications.
        </p>

        <h2 className={styles.subheader}>Why I write</h2>
        <p className={styles.paragraph}>
          This blog exists for a few reasons. First, writing forces me to
          actually understand what I&apos;m learning. If I can&apos;t explain it
          clearly, I don&apos;t really know it. Second, I want to share the
          knowledge I&apos;ve picked up so others don&apos;t have to make all
          the same mistakes I did. And third, I&apos;m building a public record
          of my thinking—both to hold myself accountable and to look back on how
          my understanding evolves.
        </p>

        <p className={styles.paragraph}>
          I write about whatever I&apos;m learning at the moment: technical
          deep-dives, business lessons from my small ventures, philosophical
          rabbit holes I fall into, and honest reflections on what&apos;s
          working (and what&apos;s not). The goal isn&apos;t to position myself
          as an expert—it&apos;s to document the journey and share useful
          insights along the way.
        </p>

        <h2 className={styles.subheader}>Let&apos;s connect</h2>
        <p className={styles.paragraph}>
          If something I wrote resonated with you, or if you want to chat about
          development, AI, or building things, feel free to reach out. I&apos;m
          always up for conversations with people who are genuinely curious and
          building stuff.
        </p>
      </div>
    </section>
  );
}
