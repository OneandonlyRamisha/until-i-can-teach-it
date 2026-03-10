/**
 * Run with: node scripts/seed-admin.mjs
 * Creates or updates the admin user in MongoDB.
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
const envVars = readFileSync(envPath, "utf8")
  .split("\n")
  .filter((line) => line.includes("=") && !line.startsWith("#"));
for (const line of envVars) {
  const [key, ...rest] = line.split("=");
  process.env[key.trim()] = rest.join("=").trim();
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});
const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

await mongoose.connect(MONGODB_URI);

const username = "ramisha";
const password = "lukaramo1234";
const passwordHash = await bcrypt.hash(password, 12);

await User.findOneAndUpdate(
  { username },
  { username, passwordHash },
  { upsert: true, new: true }
);

console.log(`Admin user "${username}" saved to database.`);
await mongoose.disconnect();
