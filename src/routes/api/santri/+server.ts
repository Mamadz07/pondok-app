
import { db } from '$lib/server/db';
import {
	json,
	error,
	type Cookies
} from '@sveltejs/kit';

import { santriSchema }
	from '$lib/validations/santri';

function authorize(
	cookies: Cookies
) {

	const session =
		cookies.get('session');

	if (!session) {

		throw error(401, {
			message:
				'Unauthorized'
		});
	}

	const user =
		JSON.parse(session);

	// IZINKAN ADMIN & OPERATOR
	if (
		user.role !== 'admin' &&
		user.role !== 'operator'
	) {

		throw error(403, {
			message:
				'Forbidden'
		});
	}

	return user;
}


// CREATE SANTRI
export async function POST({
	request,
	cookies
}) {

	authorize(cookies);

	const body =
		await request.json();

	const validation =
		santriSchema.safeParse(
			body
		);

	if (!validation.success) {

		return json(
			{
				success: false,
				errors:
					validation.error.flatten()
			},
			{
				status: 400
			}
		);
	}

	const {
		nama,
		no_hp,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali,
		tanggal_masuk
	} = body;

	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				tempat_lahir,
				tanggal_lahir,
				alamat,
				nama_wali,
				no_hp_wali,
				tanggal_masuk,
				role,
				status
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`,
		args: [
			nama,
			no_hp,
			tempat_lahir,
			tanggal_lahir,
			alamat,
			nama_wali,
			no_hp_wali,
			tanggal_masuk,
			'santri',
			'aktif'
		]
	});

	return json({
		success: true,
		message:
			'Santri berhasil ditambahkan'
	});
}


// UPDATE SANTRI
export async function PUT({
	request,
	cookies
}) {

	authorize(cookies);

	const body =
		await request.json();

	const {
		id,
		nama,
		no_hp,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali
	} = body;

	// VALIDASI
	if (
		!id ||
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
					'Semua form wajib diisi'
			},
			{
				status: 400
			}
		);
	}

	await db.execute({
		sql: `
			UPDATE users
			SET
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
			'Data santri berhasil diupdate'
	});
}


// DELETE SANTRI
export async function DELETE({
	request,
	cookies
}) {

	authorize(cookies);

	const { id } =
		await request.json();

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
			'Data santri berhasil dihapus'
	});
}
