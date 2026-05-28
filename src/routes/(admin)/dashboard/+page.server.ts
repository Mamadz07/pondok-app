import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({
	cookies
}) {

	const session =
		cookies.get('session');

	if (!session) {

		throw redirect(
			302,
			'/login'
		);
	}

	const user =
		JSON.parse(session);

	// TOTAL SANTRI
	const santri =
		await db.execute(`
			SELECT COUNT(*) as total
			FROM users
			WHERE role = 'santri'
		`);

	// TOTAL ALUMNI
	const alumni =
		await db.execute(`
			SELECT COUNT(*) as total
			FROM users
			WHERE role = 'alumni'
		`);

	// TOTAL PENDAFTAR
	const pendaftar =
		await db.execute(`
			SELECT COUNT(*) as total
			FROM users
			WHERE role = 'pendaftar'
		`);

	// TOTAL USERS
	const users =
		await db.execute(`
			SELECT COUNT(*) as total
			FROM users
		`);

	return {

		user,

		stats: {

			santri:
				santri.rows[0]
					.total,

			alumni:
				alumni.rows[0]
					.total,

			pendaftar:
				pendaftar.rows[0]
					.total,

			users:
				users.rows[0]
					.total
		}
	};
}