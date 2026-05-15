import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function GET() {
  // USERS
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  // SANTRI
  await db.execute(`
    CREATE TABLE IF NOT EXISTS santri (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      tempat_lahir TEXT,
      tanggal_lahir TEXT,
      alamat TEXT,
      nama_wali TEXT,
      no_hp_wali TEXT,
      tanggal_masuk TEXT,
      status TEXT
    )
  `);

  // PENDAFTAR
  await db.execute(`
	CREATE TABLE IF NOT EXISTS pendaftar (
		id INTEGER PRIMARY KEY AUTOINCREMENT,

		nama TEXT,
		tempat_lahir TEXT,
		tanggal_lahir TEXT,
		alamat TEXT,

		nama_wali TEXT,
		no_hp_wali TEXT,

		tanggal_daftar TEXT,

		status TEXT DEFAULT 'pending',

		catatan TEXT
	)
`);

  // ALUMNI
  await db.execute(`
    CREATE TABLE IF NOT EXISTS alumni (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      tahun_lulus INTEGER,
      alamat TEXT,
      pekerjaan TEXT
    )
  `);

  return json({
    message: "Database initialized"
  });
}