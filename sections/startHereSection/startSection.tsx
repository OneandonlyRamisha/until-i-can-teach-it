import StartHereContainer from "@/components/startHereContainer/startHereContainer";
import styles from "./startHereSection.module.css";
import { getPosts } from "@/lib/posts";

export default async function StartHereSection() {
  const data = await getPosts({ limit: 2 });

  return (
    <section className={styles.startHereSection}>
      <h2 className={styles.startHereHeader}>Start Here</h2>
      <div className={styles.startHereContainer}>
        {data.map((i) => (
          <StartHereContainer
            key={i.slug}
            header={i.header}
            url={i.slug}
            category={i.category}
            des={i.des}
          />
        ))}
      </div>
    </section>
  );
}
