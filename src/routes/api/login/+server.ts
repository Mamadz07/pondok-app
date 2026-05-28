import { db } from '$lib/server/db';
import { comparePassword } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export async function POST({
	request,
	cookies
}) {

	const {
		username,
		password
	} = await request.json();

	// cari admin
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM admin
				WHERE username = ?
			`,
			args: [username]
		});

	const admin =
		result.rows[0];

	if (!admin) {

		return json(
			{
				success: false,
				message: 'Admin tidak ditemukan'
			},
			{
				status: 401
			}
		);
	}

	// cek password
	const valid =
		await comparePassword(
			password,
			admin.password as string
		);

	if (!valid) {

		return json(
			{
				success: false,
				message: 'Password salah'
			},
			{
				status: 401
			}
		);
	}

	// simpan session
	cookies.set(
		'session',

		JSON.stringify({
			id: admin.id,
			username: admin.username,
			role: 'admin'
		}),

		{
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 60 * 60 * 24
		}
	);

	return json({
		success: true,
		role: 'admin'
	});
}