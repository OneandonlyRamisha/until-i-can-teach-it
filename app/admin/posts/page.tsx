"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaPencil } from "react-icons/fa6";
import styles from "./page.module.css";

type Post = {
  slug: string;
  header: string;
  category: string;
  date: string;
  duration: number;
};

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (slug: string, header: string) => {
    if (!confirm(`Delete "${header}"?`)) return;
    setDeletingSlug(slug);
    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((p) => p.filter((post) => post.slug !== slug));
    }
    setDeletingSlug(null);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Posts</h1>
        <div className={styles.topActions}>
          <Link href="/admin/new-post" className={styles.newBtn}>
            New Post
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <p className={styles.empty}>Loading...</p>
      ) : posts.length === 0 ? (
        <p className={styles.empty}>No posts yet.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <div className={styles.itemMeta}>
                <span className={styles.itemCategory}>{post.category}</span>
                <span className={styles.itemDate}>{post.date}</span>
                <span className={styles.itemDuration}>{post.duration} min</span>
              </div>
              <p className={styles.itemHeader}>{post.header}</p>
              <div className={styles.itemActions}>
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className={styles.editBtn}
                  aria-label="Edit post"
                >
                  <FaPencil />
                </Link>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(post.slug, post.header)}
                  disabled={deletingSlug === post.slug}
                  aria-label="Delete post"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
