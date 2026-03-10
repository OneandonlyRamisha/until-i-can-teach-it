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

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: IPost[]) => {
        setPosts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        setLoading(false);
      });
  }, []);

  const visible =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <section className={styles.blogSection}>
      <div className={styles.headerContainer}>
        <Link href={"/"} className={styles.goBackContainer}>
          <FaArrowLeftLong className={styles.icon} />
          <p className={styles.goBack}>Home</p>
        </Link>
        <h1 className={styles.header}>Read All The Available Articles</h1>
        <span className={styles.line}></span>
      </div>
      <h3 className={styles.subheader}>
        {`Find all the available articles written by owner of the website about number of topics from sales and philosophy all the way to coding and self improvement. Browse through ${posts.length}+ articles`}
      </h3>
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
      <div className={styles.blogContainer}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          visible.map((i) => (
            <LastPostsContainer
              header={i.header}
              url={i.slug}
              des={i.des}
              key={i.slug}
              category={i.category}
              date={i.date}
              duration={i.duration}
            />
          ))
        )}
      </div>
    </section>
  );
}
