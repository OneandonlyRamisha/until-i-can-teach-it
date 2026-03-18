import Link from "next/link";
import styles from "./topicsContainer.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

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
      <span className={styles.topic}>{topic}</span>
      <div className={styles.right}>
        <span className={styles.count}>
          {posts} {posts === 1 ? "Essay" : "Essays"}
        </span>
        <FaArrowRightLong className={styles.icon} />
      </div>
    </Link>
  );
}
