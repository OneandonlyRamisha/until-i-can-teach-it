import TopicsContainer from "@/components/topicsContainer/topicsContainer";
import { getCategoryCounts } from "@/lib/posts";
import styles from "./topicsSection.module.css";

export default async function TopicsSection() {
  const categories = await getCategoryCounts();

  return (
    <section className={styles.topicsSection}>
      <h2 className={styles.topicsHeader}>Explore Topics</h2>
      <div className={styles.topicsContainer}>
        {categories.map(({ category, count }) => (
          <TopicsContainer
            url={`/blog?category=${category}`}
            key={category}
            topic={category}
            posts={count}
          />
        ))}
      </div>
    </section>
  );
}
