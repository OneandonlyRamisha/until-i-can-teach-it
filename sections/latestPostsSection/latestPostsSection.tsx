import Link from "next/link";
import LastPostsContainer from "@/components/lastPostsContainer/lastPostsContainer";
import { getPosts } from "@/lib/posts";
import styles from "./latestPostsSection.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function LatestPostsSection() {
  const latestPosts = await getPosts({ sortByDate: true, limit: 3 });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>Recent Essays</span>
          <h2 className={styles.title}>
            Latest <em>Posts</em>
          </h2>
        </div>
        <Link href="/blog" className={styles.viewAll}>
          <span>View All Essays</span>
          <FaArrowRightLong className={styles.viewAllIcon} />
        </Link>
      </div>
      <div className={styles.list}>
        {latestPosts.map((post, index) => (
          <LastPostsContainer
            key={post.slug}
            category={post.category}
            duration={post.duration}
            header={post.header}
            des={post.des}
            date={post.date}
            url={`${post.slug}`}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
