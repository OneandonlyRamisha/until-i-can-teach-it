import styles from "./footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {year} Until I Can Teach It. All rights reserved.
      </p>
      <div className={styles.socials}>
        <a
          href="https://www.linkedin.com/in/luka-ramishvili-72550035b/"
          target="_blank"
        >
          LinkedIn
        </a>
        <a href="https://www.instagram.com/ramishaluka/" target="_blank">
          Instagram
        </a>
        <a href="https://github.com/OneandonlyRamisha" target="_blank">
          Github
        </a>
      </div>
    </footer>
  );
}
