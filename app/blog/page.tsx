"use client";

import { POSTS } from "@/data/posts";
import styles from "./page.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import LastPostsContainer from "@/components/lastPostsContainer/lastPostsContainer";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Blog() {
  const count = POSTS.length;
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [filter, setFilter] = useState<string>(categoryFromUrl || "All");
  return (
    <section className={styles.blogSection}>
      <div className={styles.headerContainer}>
        <Link href={"/"} className={styles.goBackContainer}>
          <FaArrowLeftLong className={styles.icon} />
          <p className={styles.goBack}>Home</p>
        </Link>
        <h1 className={styles.header}>Read All The Available Articles</h1>
        <span className={styles.line}></span>
      </div>{" "}
      <h3 className={styles.subheader}>
        {`  Find all the available articles written by owner of the website about number of topics from sales and philosophy all the way to coding and self improvement. Browse through ${count}+ articles `}
      </h3>
      <div className={styles.filterContainer}>
        {["All", ...new Set(POSTS.map((i) => i.category))].map((category) => (
          <button
            className={`${styles.filter} ${filter === category ? styles.active : null}`}
            key={category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.blogContainer}>
        {filter === "All"
          ? POSTS.map((i) => (
              <LastPostsContainer
                header={i.header}
                url={i.slug}
                des={i.des}
                key={i.header}
                category={i.category}
                date={i.date}
                duration={i.duration}
              />
            ))
          : POSTS.filter((i) => i.category === filter).map((i) => (
              <LastPostsContainer
                header={i.header}
                url={i.slug}
                des={i.des}
                key={i.header}
                category={i.category}
                date={i.date}
                duration={i.duration}
              />
            ))}
      </div>
    </section>
  );
}
