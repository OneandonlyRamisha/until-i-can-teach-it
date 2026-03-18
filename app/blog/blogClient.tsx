"use client";

import { IPost } from "@/lib/models/Post";
import styles from "./page.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import LastPostsContainer from "@/components/lastPostsContainer/lastPostsContainer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BlogClient() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>(categoryFromUrl || "All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: IPost[]) => {
        setPosts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const visible =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <section className={styles.section}>
      <div className={styles.headerArea}>
        <Link href="/" className={styles.goBack}>
          <FaArrowLeftLong className={styles.goBackIcon} />
          <span>Home</span>
        </Link>

        <div className={styles.headerText}>
          <span className={styles.label}>All Essays</span>
          <h1 className={styles.title}>
            The <em>Journal</em>
          </h1>
          <p className={styles.subtitle}>
            {posts.length > 0 ? `${posts.length} essay${posts.length !== 1 ? "s" : ""}` : "Essays"} on
            philosophy — stoicism, ethics, metaphysics, and the questions
            worth sitting with.
          </p>
        </div>
      </div>

      <div className={styles.filterContainer}>
        {["All", ...categories].map((category) => (
          <button
            className={`${styles.filter} ${filter === category ? styles.active : ""}`}
            key={category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {loading ? (
          <p className={styles.loading}>Loading essays…</p>
        ) : error ? (
          <p className={styles.loading}>Could not load essays. Please refresh.</p>
        ) : (
          visible.map((post, index) => (
            <LastPostsContainer
              header={post.header}
              url={post.slug}
              des={post.des}
              key={post.slug}
              category={post.category}
              date={post.date}
              duration={post.duration}
              index={index}
            />
          ))
        )}
      </div>
    </section>
  );
}
