import Link from "next/link";
import styles from "./lastPostsContainer.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function LastPostsContainer({
  url,
  category,
  header,
  des,
  date,
  duration,
  index,
}: {
  url: string;
  category: string;
  header: string;
  des: string;
  date: string;
  duration: number;
  index?: number;
}) {
  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <Link href={`/blog/${url}`} className={styles.container}>
      <span className={styles.num}>{num}</span>

      <div className={styles.body}>
        <h4 className={styles.header}>{header}</h4>
        <p className={styles.des}>{des}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.category}>{category}</span>
        <span className={styles.divider}>·</span>
        <span className={styles.date}>{date}</span>
        <span className={styles.divider}>·</span>
        <span className={styles.duration}>{duration} min</span>
      </div>

      <FaArrowRightLong className={styles.icon} />
    </Link>
  );
}
