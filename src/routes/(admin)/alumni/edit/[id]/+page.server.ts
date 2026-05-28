import { db } from '$lib/server/db';

export async function load({
	params
}) {

	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM users
				WHERE
					id = ?
					AND role = 'alumni'
			`,
			args: [params.id]
		});

	return {
		alumni:
			result.rows[0]
	};
}