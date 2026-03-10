import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <p className={styles.code}>404</p>
      <span className={styles.line} />
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.message}>
        Looks like this page doesn&apos;t exist — or maybe it never did.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primaryBtn}>
          Go home
        </Link>
        <Link href="/blog" className={styles.secondaryBtn}>
          Read articles
        </Link>
      </div>
    </main>
  );
}
