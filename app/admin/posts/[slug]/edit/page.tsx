"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../../new-post/page.module.css";
import type { Block, ParagraphPart } from "@/lib/models/Post";

function parseContent(raw: string): Block[] {
  const blocks: Block[] = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const headerMatch = t.match(/^#{1,6}\s+(.+)/);
    if (headerMatch) {
      blocks.push({ type: "header", text: headerMatch[1] });
    } else if (
      (t.startsWith('"') && t.endsWith('"')) ||
      (t.startsWith("\u201c") && t.endsWith("\u201d"))
    ) {
      blocks.push({ type: "quote", text: t.slice(1, -1) });
    } else if (t.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last?.type === "bullets") last.items.push(t.slice(2));
      else blocks.push({ type: "bullets", items: [t.slice(2)] });
    } else {
      const parts: ParagraphPart[] = [];
      const regex = /\*([^*]+)\*/g;
      let idx = 0;
      let match;
      while ((match = regex.exec(t)) !== null) {
        if (match.index > idx) parts.push(t.slice(idx, match.index));
        parts.push({ highlight: match[1] });
        idx = regex.lastIndex;
      }
      if (idx < t.length) parts.push(t.slice(idx));
      if (parts.length) blocks.push({ type: "paragraph", parts });
    }
  }
  return blocks;
}

function serializeContent(blocks: Block[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "header":
          return `# ${block.text}`;
        case "quote":
          return `"${block.text}"`;
        case "bullets":
          return block.items.map((item) => `- ${item}`).join("\n");
        case "paragraph":
          return (block.parts as ParagraphPart[])
            .map((p) => (typeof p === "string" ? p : `*${p.highlight}*`))
            .join("");
        default:
          return "";
      }
    })
    .join("\n");
}

function calcDuration(des: string, raw: string): number {
  const words = (des + " " + raw).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function EditPostPage() {
  const router = useRouter();
  const { slug: originalSlug } = useParams<{ slug: string }>();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [header, setHeader] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState("");
  const [rawContent, setRawContent] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${originalSlug}`)
      .then((r) => r.json())
      .then((post) => {
        setHeader(post.header);
        setCategory(post.category);
        setDes(post.des);
        setDate(post.date);
        setRawContent(serializeContent(post.content ?? []));
        setLoading(false);
      });
  }, [originalSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const body = {
      slug: originalSlug,
      header,
      category,
      des,
      date,
      duration: calcDuration(des, rawContent),
      content: parseContent(rawContent),
    };

    const res = await fetch(`/api/posts/${originalSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      let data: { error?: string } = {};
      try { data = await res.json(); } catch { /* empty body */ }
      setError(data.error || "Failed to update post");
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <p style={{ color: "var(--secondaryText)", fontSize: "1.6rem" }}>Loading...</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.topBar}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/admin/posts" className={styles.logoutBtn}>
            ← Posts
          </Link>
          <h1 className={styles.pageTitle}>Edit Post</h1>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Log out
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.metaGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="header">
              Header
            </label>
            <input
              id="header"
              className={styles.input}
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Slug</label>
            <input
              className={`${styles.input} ${styles.readOnly}`}
              value={originalSlug}
              readOnly
              tabIndex={-1}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="category">
              Category
            </label>
            <input
              id="category"
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Philosophy"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="date">
              Date
            </label>
            <input
              id="date"
              className={styles.input}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="des">
            Description
          </label>
          <textarea
            id="des"
            className={styles.textarea}
            value={des}
            onChange={(e) => setDes(e.target.value)}
            placeholder="Short post description shown in cards"
            rows={3}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="content">
            Content
          </label>
          <p className={styles.hint}>
            <code># Header</code> &nbsp;·&nbsp; <code>&quot;Quote&quot;</code> &nbsp;·&nbsp;{" "}
            <code>*highlight*</code> &nbsp;·&nbsp; <code>- bullet</code>
          </p>
          <textarea
            id="content"
            className={styles.contentTextarea}
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            rows={24}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}
