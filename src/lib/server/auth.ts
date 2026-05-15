import bcrypt from "bcryptjs";
import { db } from "$lib/server/db";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
) {
  return await bcrypt.compare(password, hash);
}

export async function createUser(
  username: string,
  password: string,
  role: string
) {
  const hashed = await hashPassword(password);

  await db.execute({
    sql: `
      INSERT INTO users (username, password, role)
      VALUES (?, ?, ?)
    `,
    args: [username, hashed, role]
  });
}   