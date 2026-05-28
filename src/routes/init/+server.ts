import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {

	// ADMIN
	await db.execute(`
		CREATE TABLE IF NOT EXISTS admin (
			id INTEGER PRIMARY KEY AUTOINCREMENT,

			username TEXT UNIQUE,
			password TEXT
		)
	`);

	// USERS
	await db.execute(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,

			nama TEXT NOT NULL,

			username TEXT,
			password TEXT,

			no_hp TEXT,
			alamat TEXT,

			tempat_lahir TEXT,
			tanggal_lahir TEXT,

			nama_wali TEXT,
			no_hp_wali TEXT,

			tanggal_daftar TEXT,
			tanggal_masuk TEXT,

			tahun_lulus INTEGER,

			role TEXT DEFAULT 'pendaftar',

			status TEXT DEFAULT 'pending'
		)
	`);

	return json({
		success: true,
		message: 'Database initialized'
	});
}