/**
 * Run with: node scripts/hash-password.mjs
 * Paste the resulting hash into .env.local as ADMIN_PASSWORD_HASH
 */
import bcrypt from "bcryptjs";
import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Password to hash: ", async (password) => {
  const hash = await bcrypt.hash(password, 12);
  console.log("\nAdd this to .env.local:");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  rl.close();
});
