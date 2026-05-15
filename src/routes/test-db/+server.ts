import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function GET() {
  const result = await db.execute("SELECT 1");

  return json({
    success: true,
    result
  });
}