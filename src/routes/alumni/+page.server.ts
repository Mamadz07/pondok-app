import { db } from "$lib/server/db";

export async function load({
	url,
	locals
}) {

	const search =
		url.searchParams.get(
			"search"
		) || "";

	let result;

	if (search) {

		result =
			await db.execute({
				sql: `
					SELECT *
					FROM alumni
					WHERE nama LIKE ?
					ORDER BY id DESC
				`,
				args: [
					`%${search}%`
				]
			});

	} else {

		result =
			await db.execute(`
				SELECT *
				FROM alumni
				ORDER BY id DESC
			`);

	}

	return {
		alumni: result.rows,
		search,
		user: locals.user
	};
}