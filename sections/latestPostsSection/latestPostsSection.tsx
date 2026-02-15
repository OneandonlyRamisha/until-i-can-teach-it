import LastPostsContainer from "@/components/lastPostsContainer/lastPostsContainer";
import { POSTS } from "@/data/posts";
import styles from "./latestPostsSection.module.css";

export default function LatestPostsSection() {
  // Sorts by the 'date' field in your POSTS data, newest first
  const latestPosts = POSTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ).slice(0, 3);

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
