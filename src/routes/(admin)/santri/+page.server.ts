import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({
	url,
	locals,
	cookies
}) {

	// CEK LOGIN
	const session =
		cookies.get('session');

	if (!session) {

		throw redirect(
			302,
			'/login'
		);
	}

	const search =
		url.searchParams.get(
			'search'
		) || '';

	let result;

	// SEARCH SANTRI
	if (search) {

		result =
			await db.execute({
				sql: `
					SELECT *
					FROM users
					WHERE
						role = ?
						AND nama LIKE ?
					ORDER BY id DESC
				`,

				args: [
					'santri',
					`%${search}%`
				]
			});
	}

	// ALL SANTRI
	else {

		result =
			await db.execute({
				sql: `
					SELECT *
					FROM users
					WHERE role = ?
					ORDER BY id DESC
				`,

				args: ['santri']
			});
	}

	return {

		santri:
			result.rows,

		user:
			locals.user,

		search,

		total:
			result.rows.length
	};
}