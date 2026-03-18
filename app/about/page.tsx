import type { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm Luka — I write about philosophy. Stoicism, ethics, metaphysics, and the questions that don't have easy answers. I write to understand.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Until I Can Teach It",
    description:
      "I'm Luka — I write about philosophy. Stoicism, ethics, metaphysics, and the questions that don't have easy answers. I write to understand.",
    url: "/about",
  },
};

export default function About() {
  return (
    <section className={styles.section}>
      <Link href="/" className={styles.goBack}>
        <FaArrowLeftLong className={styles.goBackIcon} />
        <span>Home</span>
      </Link>

      {/* ── Hero name ── */}
      <div className={styles.hero}>
        <span className={styles.label}>About the Author</span>
        <h1 className={styles.name}>Hey, I&apos;m Luka</h1>
      </div>

      {/* ── Lead paragraph ── */}
      <p className={styles.lead}>
        This is a philosophy journal — nothing else. I write about stoicism,
        ethics, metaphysics, epistemology, and the questions philosophy has
        spent centuries trying to answer. What makes a good life? What can we
        actually know? How should we act? I don&apos;t claim to have the answers
        — but I think the questions are worth taking seriously.
      </p>

      {/* ── Numbered sections ── */}
      <div className={styles.entries}>
        <div className={styles.entry}>
          <div className={styles.entryLeft}>
            <span className={styles.entryNum}>01</span>
            <h2 className={styles.entryTitle}>What this journal is</h2>
          </div>
          <div className={styles.entryContent}>
            <p className={styles.paragraph}>
              Pure philosophy. I&apos;m not writing about productivity,
              self-help, or adjacent topics that borrow philosophical language.
              Every essay here is about a genuine philosophical question or
              thinker — worked out properly, with the rigour the subject
              deserves.
            </p>
            <p className={styles.paragraph}>
              I started with Stoic ethics and Socratic dialogue, and kept going
              from there — into existentialism, virtue ethics, philosophy of
              mind, and the ancient thinkers who still hold up. The more I read,
              the more I find that philosophy isn&apos;t abstract: it changes
              how you think, decide, and live.
            </p>
          </div>
        </div>

        <div className={styles.entry}>
          <div className={styles.entryLeft}>
            <span className={styles.entryNum}>02</span>
            <h2 className={styles.entryTitle}>Why I write</h2>
          </div>
          <div className={styles.entryContent}>
            <p className={styles.paragraph}>
              Writing is how I think. When an idea lives only in my head, it
              feels complete — but the moment I try to put it into words, I
              discover all the gaps. This journal is my way of stress-testing my
              understanding. If I can explain a concept clearly, I probably
              understand it. If I can&apos;t, I have more work to do.
            </p>
            <p className={styles.paragraph}>
              There&apos;s also something powerful about thinking in public. It
              keeps me honest, forces clarity, and occasionally connects me with
              others who are asking the same questions. I&apos;m not writing as
              an authority — I&apos;m writing as someone actively working things
              out, one essay at a time.
            </p>
          </div>
        </div>

        <div className={styles.entry}>
          <div className={styles.entryLeft}>
            <span className={styles.entryNum}>03</span>
            <h2 className={styles.entryTitle}>Let&apos;s connect</h2>
          </div>
          <div className={styles.entryContent}>
            <p className={styles.paragraph}>
              If something I wrote made you pause, disagree, or see something
              differently, I&apos;d love to hear from you. The best
              conversations I&apos;ve had started with someone pushing back on
              an idea. I&apos;m always open to thoughtful dialogue with people
              who take ideas seriously.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.linkedin.com/in/luka-ramishvili-72550035b/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/ramishaluka/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a
                href="https://github.com/OneandonlyRamisha"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
