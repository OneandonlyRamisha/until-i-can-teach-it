import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import styles from "./page.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import type { Block, ParagraphPart } from "@/lib/models/Post";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://untilicanteachit.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.header,
    description: post.des,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.header,
      description: post.des,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: ["Luka"],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.header,
      description: post.des,
    },
  };
}

function renderParts(parts: ParagraphPart[]) {
  return (parts ?? []).map((part, idx) =>
    typeof part === "string" ? (
      <span key={idx}>{part}</span>
    ) : (
      <span key={idx} className={styles.highlight}>
        {part.highlight}
      </span>
    )
  );
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.header,
    description: post.des,
    datePublished: post.date,
    author: { "@type": "Person", name: "Luka", url: `${siteUrl}/about` },
    publisher: { "@type": "Person", name: "Luka" },
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
  };

  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog" className={styles.goBackContainer}>
        <FaArrowLeftLong className={styles.icon} />
        <p className={styles.goBack}>All Articles</p>
      </Link>
      <h2 className={styles.header}>{post.header}</h2>
      <p className={styles.date}>{post.date}</p>
      <span className={styles.line}></span>

      {(post.content as Block[]).map((block, index) => {
        switch (block.type) {
          case "header":
            return (
              <h6 key={index} className={styles.paragraphHeader}>
                {block.text}
              </h6>
            );
          case "quote":
            return (
              <p key={index} className={styles.quote}>
                {block.text}
              </p>
            );
          case "bullets":
            return (
              <ul key={index} className={styles.bullets}>
                {block.items.map((item, i) => (
                  <li key={i} className={styles.bullet}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return (
              <p key={index} className={styles.paragraph}>
                {renderParts((block as { type: "paragraph"; parts: ParagraphPart[] }).parts)}
              </p>
            );
        }
      })}
    </article>
  );
}
