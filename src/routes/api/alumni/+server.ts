import { db } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import {
	alumniSchema,
	updateAlumniSchema
} from "$lib/validations/alumni";


// CREATE
export async function POST({
	request,
	cookies
}) {

	const session =
		cookies.get("session");

	if (!session) {
		return json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	const user =
		JSON.parse(session);

	if (
		user.role !== "operator"
	) {
		return json(
			{
				message: "Forbidden"
			},
			{
				status: 403
			}
		);
	}

	const body =
		await request.json();

	const validation =
		alumniSchema.safeParse(
			body
		);

	if (
		!validation.success
	) {
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
		tahun_lulus,
		alamat,
		pekerjaan
	} = body;

	await db.execute({
		sql: `
			INSERT INTO alumni (
				nama,
				tahun_lulus,
				alamat,
				pekerjaan
			)
			VALUES (?, ?, ?, ?)
		`,
		args: [
			nama,
			tahun_lulus,
			alamat,
			pekerjaan
		]
	});

	return json({
		success: true
	});
}


// DELETE
export async function DELETE({
	request,
	cookies
}) {

	const session =
		cookies.get("session");

	if (!session) {
		return json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	const user =
		JSON.parse(session);

	if (
		user.role !== "operator"
	) {
		return json(
			{
				message: "Forbidden"
			},
			{
				status: 403
			}
		);
	}

	const { id } =
		await request.json();

	await db.execute({
		sql: `
			DELETE FROM alumni
			WHERE id = ?
		`,
		args: [id]
	});

	return json({
		success: true
	});
}

// UPDATE
export async function PUT({
	request,
	cookies
}) {

	const session =
		cookies.get("session");

	if (!session) {
		return json(
			{
				message: "Unauthorized"
			},
			{
				status: 401
			}
		);
	}

	const user =
		JSON.parse(session);

	if (
		user.role !== "operator"
	) {
		return json(
			{
				message: "Forbidden"
			},
			{
				status: 403
			}
		);
	}

	const body =
		await request.json();

	const validation =
	updateAlumniSchema.safeParse(
		body
	);

	if (
		!validation.success
	) {
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
		id,
		nama,
		tahun_lulus,
		alamat,
		pekerjaan
	} = body;

	await db.execute({
		sql: `
			UPDATE alumni
			SET
				nama = ?,
				tahun_lulus = ?,
				alamat = ?,
				pekerjaan = ?
			WHERE id = ?
		`,
		args: [
			nama,
			tahun_lulus,
			alamat,
			pekerjaan,
			id
		]
	});

	return json({
		success: true
	});
}