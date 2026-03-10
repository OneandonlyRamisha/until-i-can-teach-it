import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/posts";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? undefined;
  const posts = await getPosts({ category });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
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

  try {
    const { category, slug, header, des, date, duration, content } = await request.json();
    await dbConnect();
    const post = await Post.create({ category, slug, header, des, date, duration, content });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
