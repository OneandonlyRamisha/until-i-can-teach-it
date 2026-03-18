import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPosts } from "@/lib/posts";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import { isSameOrigin } from "@/lib/csrf";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? undefined;
  const posts = await getPosts({ category });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyToken(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { category, slug, header, des, date, duration, content } = body;

  if (!category || typeof category !== "string" || !category.trim())
    return NextResponse.json({ error: "category is required" }, { status: 400 });
  if (!slug || typeof slug !== "string" || !slug.trim())
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  if (!header || typeof header !== "string" || !header.trim())
    return NextResponse.json({ error: "header is required" }, { status: 400 });
  if (!des || typeof des !== "string" || !des.trim())
    return NextResponse.json({ error: "des is required" }, { status: 400 });
  if (!date || typeof date !== "string" || !date.trim())
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  if (typeof duration !== "number" || !Number.isFinite(duration) || duration < 1)
    return NextResponse.json({ error: "duration must be a positive number" }, { status: 400 });
  if (!Array.isArray(content))
    return NextResponse.json({ error: "content must be an array" }, { status: 400 });

  try {
    await dbConnect();
    const post = await Post.create({ category, slug, header, des, date, duration, content });
    revalidatePath("/");
    revalidatePath("/blog");
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
