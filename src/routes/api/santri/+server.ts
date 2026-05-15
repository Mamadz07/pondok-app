import { db } from "$lib/server/db";
import { json, error } from "@sveltejs/kit";
import { santriSchema } from "$lib/validations/santri";

function authorize({ cookies }) {
  const session = cookies.get("session");

  if (!session) {
    throw error(401, {
      message: "Unauthorized"
    });
  }

  const user = JSON.parse(session);

  if (user.role !== "operator") {
    throw error(403, {
      message: "Forbidden"
    });
  }

  return user;
}

// CREATE
export async function POST({ request, cookies }) {
  authorize({ cookies });

  const body = await request.json();
  const validation =
  santriSchema.safeParse(body);

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
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_wali,
    no_hp_wali,
    tanggal_masuk,
    status
  } = body;

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
      nama,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      nama_wali,
      no_hp_wali,
      tanggal_masuk,
      status
    ]
  });

  return json({
    success: true
  });
}


// UPDATE
export async function PUT({ request, cookies }) {
  authorize({ cookies });

  const body = await request.json();

  const {
    id,
    nama,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_wali,
    no_hp_wali,
    tanggal_masuk,
    status
  } = body;

  await db.execute({
    sql: `
      UPDATE santri
      SET
        nama = ?,
        tempat_lahir = ?,
        tanggal_lahir = ?,
        alamat = ?,
        nama_wali = ?,
        no_hp_wali = ?,
        tanggal_masuk = ?,
        status = ?
      WHERE id = ?
    `,
    args: [
      nama,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      nama_wali,
      no_hp_wali,
      tanggal_masuk,
      status,
      id
    ]
  });

  return json({
    success: true
  });
}


// DELETE
export async function DELETE({ request, cookies }) {
  authorize({ cookies });

  const { id } = await request.json();

  await db.execute({
    sql: `
      DELETE FROM santri
      WHERE id = ?
    `,
    args: [id]
  });

  return json({
    success: true
  });
}