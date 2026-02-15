import { POSTS } from "@/data/posts";
import styles from "./page.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className={styles.article}>
      <Link href={"/blog"} className={styles.goBackContainer}>
        <FaArrowLeftLong className={styles.icon} />
        <p className={styles.goBack}>All Articles</p>
      </Link>
      <h2 className={styles.header}>{post.header}</h2>
      <p className={styles.date}>{post.date}</p>
      <span className={styles.line}></span>
      <p className={styles.intro}>{post.content[0].intro}</p>

      {post.content.map((i, index) => (
        <div key={index} className={styles.paragraphContainer}>
          <h6 className={styles.paragraphHeader}>{i.title}</h6>
          <p className={styles.paragraph}>
            {i.paragraph?.map((part, idx) =>
              typeof part === "string" ? (
                <span key={idx}>{part}</span>
              ) : (
                <span key={idx} className={styles.highlight}>
                  {part.highlight}
                </span>
              ),
            )}
          </p>
        </div>
      ))}
    </article>
  );
}
