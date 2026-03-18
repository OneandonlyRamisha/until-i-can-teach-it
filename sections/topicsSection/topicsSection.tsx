import TopicsContainer from "@/components/topicsContainer/topicsContainer";
import { getCategoryCounts } from "@/lib/posts";
import styles from "./topicsSection.module.css";

export default async function TopicsSection() {
  const categories = await getCategoryCounts();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Browse by Category</span>
          <h2 className={styles.title}>
            Explore <em>Topics</em>
          </h2>
        </div>
        <div className={styles.list}>
          {categories.map(({ category, count }) => (
            <TopicsContainer
              url={`/blog?category=${category}`}
              key={category}
              topic={category}
              posts={count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
