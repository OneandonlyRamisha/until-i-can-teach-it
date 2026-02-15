import Link from "next/link";
import styles from "./startHereContainer.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function StartHereContainer({
  category,
  header,
  des,
  url,
}: {
  category: string;
  header: string;
  des: string;
  url: string;
}) {
  return (
    <Link href={`/blog/${url}`} className={styles.container}>
      <p className={styles.category}>{category}</p>
      <p className={styles.header}>{header}</p>
      <p className={styles.des}>{des}</p>

      <div className={styles.ctaContainer}>
        <p className={styles.cta}>Read More</p>
        <FaArrowRightLong className={styles.icon} />
      </div>
    </Link>
  );
}
