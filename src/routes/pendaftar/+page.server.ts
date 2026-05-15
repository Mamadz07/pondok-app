import { db } from "$lib/server/db";

export async function load() {

	const result =
		await db.execute(`
			SELECT *
			FROM pendaftar
			ORDER BY id DESC
		`);

	return {
		pendaftar:
			result.rows
	};
}