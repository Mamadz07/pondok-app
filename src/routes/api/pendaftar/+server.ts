import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

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


// CREATE PENDAFTAR
export async function POST({
	request
}) {

	const {
		nama,
		no_hp,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali
	} = await request.json();

	// VALIDASI FORM
	if (
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

	// VALIDASI NO HP SANTRI
	if (
		!no_hp.startsWith('08') ||
		!/^[0-9]+$/.test(no_hp) ||
		no_hp.length < 10
	) {

		return json(
			{
				success: false,
				message:
					'Nomor HP santri tidak valid'
			},
			{
				status: 400
			}
		);
	}

	// VALIDASI NO HP WALI
	if (
		!no_hp_wali.startsWith('08') ||
		!/^[0-9]+$/.test(no_hp_wali) ||
		no_hp_wali.length < 10
	) {

		return json(
			{
				success: false,
				message:
					'Nomor HP wali tidak valid'
			},
			{
				status: 400
			}
		);
	}

	// INSERT PENDAFTAR
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
				tanggal_daftar,
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
			new Date()
				.toISOString()
				.split('T')[0],
			'pendaftar',
			'pending'
		]
	});

	return json({
		success: true,
		message:
			'Pendaftaran berhasil'
	});
}


// SETUJUI PENDAFTAR
export async function PUT({
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

	// VALIDASI ID
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

	// CEK USER
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM users
				WHERE id = ?
				AND role = 'pendaftar'
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
					'Pendaftar tidak ditemukan'
			},
			{
				status: 404
			}
		);
	}

	// UPDATE JADI SANTRI
	await db.execute({
		sql: `
			UPDATE users
			SET
				role = ?,
				status = ?,
				tanggal_masuk = ?
			WHERE id = ?
		`,
		args: [
			'santri',
			'aktif',
			new Date()
				.toISOString()
				.split('T')[0],
			id
		]
	});

	return json({
		success: true,
		message:
			'Pendaftar berhasil dijadikan santri'
	});
}


// DELETE PENDAFTAR
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

	// VALIDASI ID
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

	// CEK USER
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM users
				WHERE id = ?
				AND role = 'pendaftar'
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
					'Pendaftar tidak ditemukan'
			},
			{
				status: 404
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
			'Pendaftar berhasil dihapus'
	});
}