import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function GET() {

	// PENDAFTAR
	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tanggal_daftar
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Ahmad Fauzi',
			'081234567891',
			'Sidoarjo',
			'pending',
			'pendaftar',
			new Date().toISOString()
		]
	});

	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tanggal_daftar
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Muhammad Rizki',
			'081234567892',
			'Surabaya',
			'pending',
			'pendaftar',
			new Date().toISOString()
		]
	});

	// SANTRI
	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tanggal_masuk
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Abdul Malik',
			'081234567893',
			'Lamongan',
			'aktif',
			'santri',
			new Date().toISOString()
		]
	});

	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tanggal_masuk
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Zainal Arifin',
			'081234567894',
			'Gresik',
			'aktif',
			'santri',
			new Date().toISOString()
		]
	});

	// ALUMNI
	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tahun_lulus
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Nur Hidayat',
			'081234567895',
			'Mojokerto',
			'lulus',
			'alumni',
			2024
		]
	});

	await db.execute({
		sql: `
			INSERT INTO users
			(
				nama,
				no_hp,
				alamat,
				status,
				role,
				tahun_lulus
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		args: [
			'Fahmi Ramadhan',
			'081234567896',
			'Jombang',
			'lulus',
			'alumni',
			2025
		]
	});

	return json({
		success: true,
		message:
			'Dummy users berhasil dibuat'
	});
}