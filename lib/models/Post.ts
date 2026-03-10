import mongoose, { Schema } from "mongoose";

export type ParagraphPart = string | { highlight: string };

export type Block =
  | { type: "paragraph"; parts: ParagraphPart[] }
  | { type: "header"; text: string }
  | { type: "quote"; text: string }
  | { type: "bullets"; items: string[] };

export interface IPost {
  category: string;
  slug: string;
  header: string;
  des: string;
  date: string;
  duration: number;
  content: Block[];
}

const PostSchema = new Schema<IPost>({
  category: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  header: { type: String, required: true },
  des: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  content: [Schema.Types.Mixed],
});

// Always delete the cached model so schema changes take effect on hot-reload
delete mongoose.models.Post;
const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
