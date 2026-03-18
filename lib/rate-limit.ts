import mongoose from "mongoose";
import dbConnect from "./mongodb";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

// Minimal schema — persists across restarts and serverless instances
const schema = new mongoose.Schema(
  {
    ip:      { type: String, required: true, unique: true },
    count:   { type: Number, default: 1 },
    resetAt: { type: Date, required: true },
  },
  { collection: "rate_limits" }
);

// MongoDB TTL index: documents are automatically deleted after resetAt
schema.index({ resetAt: 1 }, { expireAfterSeconds: 0 });

const RateLimitModel =
  (mongoose.models.RateLimit as mongoose.Model<{ ip: string; count: number; resetAt: Date }>) ||
  mongoose.model<{ ip: string; count: number; resetAt: Date }>("RateLimit", schema);

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  await dbConnect();
  const now = new Date();

  const entry = await RateLimitModel.findOne({ ip });

  // No entry or window expired — start a fresh window
  if (!entry || entry.resetAt < now) {
    await RateLimitModel.findOneAndUpdate(
      { ip },
      { count: 1, resetAt: new Date(Date.now() + WINDOW_MS) },
      { upsert: true }
    );
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt.getTime() - now.getTime()) / 1000),
    };
  }

  await RateLimitModel.findOneAndUpdate({ ip }, { $inc: { count: 1 } });
  return { allowed: true };
}

export async function resetRateLimit(ip: string): Promise<void> {
  await dbConnect();
  await RateLimitModel.deleteOne({ ip });
}
