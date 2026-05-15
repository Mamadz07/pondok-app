import { db } from "$lib/server/db";

export async function load({ url, locals }) {
  const search = url.searchParams.get("search") || "";

  let result;

  if (search) {
    result = await db.execute({
      sql: `
        SELECT *
        FROM santri
        WHERE nama LIKE ?
        ORDER BY id DESC
      `,
      args: [`%${search}%`]
    });
  } else {
    result = await db.execute(`
      SELECT *
      FROM santri
      ORDER BY id DESC
    `);
  }

  return {
    santri: result.rows,
    user: locals.user,
    search
  };
}