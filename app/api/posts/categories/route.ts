import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";

export async function GET() {
  await dbConnect();
  const categories: string[] = await Post.distinct("category");
  return NextResponse.json(categories.sort());
}
