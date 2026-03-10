import dbConnect from "./mongodb";
import Post, { IPost } from "./models/Post";

export async function getPosts(options?: {
  category?: string;
  limit?: number;
  sortByDate?: boolean;
}): Promise<IPost[]> {
  await dbConnect();
  const query = options?.category ? { category: options.category } : {};
  let cursor = Post.find(query).lean();
  if (options?.sortByDate) cursor = cursor.sort({ date: -1 });
  if (options?.limit) cursor = cursor.limit(options.limit);
  return cursor as unknown as IPost[];
}

export async function getPostBySlug(slug: string): Promise<IPost | null> {
  await dbConnect();
  return Post.findOne({ slug }).lean() as unknown as IPost | null;
}

export async function getCategoryCounts(): Promise<
  { category: string; count: number }[]
> {
  await dbConnect();
  return Post.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
  ]);
}
