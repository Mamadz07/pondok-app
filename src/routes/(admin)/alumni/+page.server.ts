import { db } from '$lib/server/db';

export async function load({
	url,
	locals
}) {

	const search =
		url.searchParams.get(
			'search'
		) || '';

	let result;

	// SEARCH
	if (search) {

		result =
			await db.execute({
				sql: `
					SELECT *
					FROM users
					WHERE
						role = 'alumni'
						AND nama LIKE ?
					ORDER BY id DESC
				`,

				args: [
					`%${search}%`
				]
			});

	}

	// ALL
	else {

		result =
			await db.execute(`
				SELECT *
				FROM users
				WHERE role = 'alumni'
				ORDER BY id DESC
			`);

	}

	return {
		alumni:
			result.rows,

		search,

		user:
			locals.user
	};
}