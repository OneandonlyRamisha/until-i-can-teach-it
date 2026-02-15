import Link from "next/link";
import styles from "./topicsContainer.module.css";

export default function TopicsContainer({
  topic,
  posts,
  url,
}: {
  topic: string;
  posts: number;
  url: string;
}) {
  return (
    <Link href={url} className={styles.container}>
      <p className={styles.header}>{topic}</p>
      <p className={styles.posts}>{posts} Posts</p>
    </Link>
  );
}
