import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";


// CREATE PENDAFTARAN
export async function POST({
	request
}) {

	const body =
		await request.json();

	const {
		nama,
		tempat_lahir,
		tanggal_lahir,
		alamat,
		nama_wali,
		no_hp_wali
	} = body;

	await db.execute({
		sql: `
			INSERT INTO pendaftar (
				nama,
				tempat_lahir,
				tanggal_lahir,
				alamat,
				nama_wali,
				no_hp_wali,
				tanggal_daftar,
				status
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
		args: [
			nama,
			tempat_lahir,
			tanggal_lahir,
			alamat,
			nama_wali,
			no_hp_wali,

			new Date()
				.toISOString(),

			"pending"
		]
	});

	return json({
		success: true
	});
}

// APPROVE
export async function PUT({
	request
}) {

	const { id } =
		await request.json();

	// AMBIL DATA
	const result =
		await db.execute({
			sql: `
				SELECT *
				FROM pendaftar
				WHERE id = ?
			`,
			args: [id]
		});

	const data =
		result.rows[0];

	if (!data) {
		return json(
			{
				message:
					"Data tidak ditemukan"
			},
			{
				status: 404
			}
		);
	}

	// PINDAH KE SANTRI
	await db.execute({
		sql: `
			INSERT INTO santri (
				nama,
				tempat_lahir,
				tanggal_lahir,
				alamat,
				nama_wali,
				no_hp_wali,
				tanggal_masuk,
				status
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
		args: [
			data.nama,
			data.tempat_lahir,
			data.tanggal_lahir,
			data.alamat,
			data.nama_wali,
			data.no_hp_wali,

			new Date()
				.toISOString(),

			"Aktif"
		]
	});

	// UPDATE STATUS
	await db.execute({
		sql: `
			UPDATE pendaftar
			SET status = 'approved'
			WHERE id = ?
		`,
		args: [id]
	});

	return json({
		success: true
	});
}


// REJECT
export async function DELETE({
	request
}) {

	const { id } =
		await request.json();

	await db.execute({
		sql: `
			DELETE FROM pendaftar
			WHERE id = ?
		`,
		args: [id]
	});

	return json({
		success: true
	});
}