import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function load({
	params,
	cookies
}) {

	// CEK LOGIN
	const session =
		cookies.get('session');

	if (!session) {

		throw error(401, {
			message:
				'Unauthorized'
		});
	}

	const id =
		Number(params.id);

	// VALIDASI ID
	if (!id) {

		throw error(400, {
			message:
				'ID tidak valid'
		});
	}

	// AMBIL DATA SANTRI
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM users
				WHERE
					id = ?
					AND role = 'santri'
			`,

			args: [id]
		});

	const santri =
		result.rows[0];

	// JIKA TIDAK ADA
	if (!santri) {

		throw error(404, {
			message:
				'Data santri tidak ditemukan'
		});
	}

	return {
		santri
	};
}