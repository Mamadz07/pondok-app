import { db } from '$lib/server/db';
import { json, type Cookies } from '@sveltejs/kit';

function authorize(cookies: Cookies) {

	const session =
		cookies.get('session');

	if (!session) {

		return {
			error: json(
				{
					message:
						'Unauthorized'
				},
				{
					status: 401
				}
			)
		};
	}

	const admin =
		JSON.parse(session);

	if (
		admin.role !== 'admin'
	) {

		return {
			error: json(
				{
					message:
						'Forbidden'
				},
				{
					status: 403
				}
			)
		};
	}

	return {
		admin
	};
}


// JADIKAN ALUMNI
export async function PUT({
	request,
	cookies
}) {

	const auth =
		authorize(cookies);

	if (auth.error) {
		return auth.error;
	}

	const {
		id,
		tahun_lulus,
		nama,
		no_hp,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali
	} = await request.json();

	// VALIDASI
	if (
		!id ||
		!tahun_lulus ||
		!nama ||
		!no_hp ||
		!tempat_lahir ||
		!tanggal_lahir ||
		!alamat ||
		!nama_wali ||
		!no_hp_wali
	) {

		return json(
			{
				success: false,
				message:
					'Data belum lengkap'
			},
			{
				status: 400
			}
		);
	}

	// CEK USER
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM users
				WHERE id = ?
			`,
			args: [id]
		});

	const user =
		result.rows[0];

	if (!user) {

		return json(
			{
				success: false,
				message:
					'User tidak ditemukan'
			},
			{
				status: 404
			}
		);
	}

	// UPDATE JADI ALUMNI
	await db.execute({
		sql: `
			UPDATE users
			SET
				role = ?,
				status = ?,
				tahun_lulus = ?,
				nama = ?,
				no_hp = ?,
				tempat_lahir = ?,
				tanggal_lahir = ?,
				alamat = ?,
				nama_wali = ?,
				no_hp_wali = ?
			WHERE id = ?
		`,
		args: [
			'alumni',
			'lulus',
			tahun_lulus,
			nama,
			no_hp,
			tempat_lahir,
			tanggal_lahir,
			alamat,
			nama_wali,
			no_hp_wali,
			id
		]
	});

	return json({
		success: true,
		message:
			'Santri berhasil dijadikan alumni'
	});
}


// HAPUS USER
export async function DELETE({
	request,
	cookies
}) {

	const auth =
		authorize(cookies);

	if (auth.error) {
		return auth.error;
	}

	const { id } =
		await request.json();

	// VALIDASI
	if (!id) {

		return json(
			{
				success: false,
				message:
					'ID tidak valid'
			},
			{
				status: 400
			}
		);
	}

	// DELETE USER
	await db.execute({
		sql: `
			DELETE FROM users
			WHERE id = ?
		`,
		args: [id]
	});

	return json({
		success: true,
		message:
			'User berhasil dihapus'
	});
}