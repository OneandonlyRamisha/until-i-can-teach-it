import LastPostsContainer from "@/components/lastPostsContainer/lastPostsContainer";
import { getPosts } from "@/lib/posts";
import styles from "./latestPostsSection.module.css";

export default async function LatestPostsSection() {
  const latestPosts = await getPosts({ sortByDate: true, limit: 3 });

  return (
    <section className={styles.lastPostsSection}>
      <h2 className={styles.lastPostsHeader}>Latest Posts</h2>
      <div className={styles.lastPostsContainer}>
        {latestPosts.map((post) => (
          <LastPostsContainer
            key={post.slug}
            category={post.category}
            duration={post.duration}
            header={post.header}
            des={post.des}
            date={post.date}
            url={`${post.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
