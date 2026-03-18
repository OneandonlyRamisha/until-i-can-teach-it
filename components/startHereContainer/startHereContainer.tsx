import Link from "next/link";
import styles from "./startHereContainer.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function StartHereContainer({
  category,
  header,
  des,
  url,
  index,
}: {
  category: string;
  header: string;
  des: string;
  url: string;
  index?: number;
}) {
  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <Link href={`/blog/${url}`} className={styles.container}>
      <span className={styles.featuredNum}>{num}</span>
      <span className={styles.category}>{category}</span>
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.des}>{des}</p>
      <div className={styles.ctaContainer}>
        <span className={styles.cta}>Read Essay</span>
        <FaArrowRightLong className={styles.icon} />
      </div>
    </Link>
  );
}
