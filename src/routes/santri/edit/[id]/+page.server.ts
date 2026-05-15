import { db } from "$lib/server/db";

export async function load({ params }) {
  const result = await db.execute({
    sql: `
      SELECT * FROM santri
      WHERE id = ?
    `,
    args: [params.id]
  });

  return {
    santri: result.rows[0]
  };
}