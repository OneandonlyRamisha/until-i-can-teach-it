import Link from "next/link";
import styles from "./footer.module.css";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.top}>
          <Link href="/" className={styles.brand}>
            <em className={styles.brandName}>Until I Can Teach It</em>
            <span className={styles.brandTagline}>
              A philosophy journal by Luka
            </span>
          </Link>

          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/luka-ramishvili-72550035b/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/ramishaluka/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/OneandonlyRamisha"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} Luka Ramishvili. All rights reserved.
          </p>
          <p className={styles.colophon}>
            If I can explain it clearly, I understand it.
          </p>
        </div>

      </div>
    </footer>
  );
}
