import TopicsContainer from "@/components/topicsContainer/topicsContainer";
import { POSTS } from "@/data/posts";
import styles from "./topicsSection.module.css";

export default function TopicsSection() {
  return (
    <section className={styles.topicsSection}>
      <h2 className={styles.topicsHeader}>Explore Topics</h2>
      <div className={styles.topicsContainer}>
        {[...new Set(POSTS.map((post) => post.category))].map((category) => {
          const categoryCount = POSTS.filter(
            (post) => post.category === category,
          ).length;
          return (
            <TopicsContainer
              url={`/blog?category=${category}`}
              key={category}
              topic={category}
              posts={categoryCount}
            />
          );
        })}
      </div>
    </section>
  );
}
