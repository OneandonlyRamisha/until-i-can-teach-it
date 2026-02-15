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
}: {
  url: string;
  category: string;
  header: string;
  des: string;
  date: string;
  duration: number;
}) {
  return (
    <Link href={`/blog/${url}`} className={styles.container}>
      <p className={styles.category}>{category}</p>
      <div className={styles.infoContainer}>
        <p className={styles.date}>{date}</p>
        <span className={styles.dot}></span>
        <p className={styles.duration}>{duration} Minutes</p>
      </div>
      <h4 className={styles.header}>{header}</h4>
      <p className={styles.des}>{des}</p>

      <div className={styles.ctaContainer}>
        <p className={styles.cta}>Read More</p>
        <FaArrowRightLong className={styles.icon} />
      </div>
    </Link>
  );
}
