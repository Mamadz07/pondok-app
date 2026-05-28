import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';

// HASH PASSWORD
export async function hashPassword(
	password: string
) {

	return await bcrypt.hash(
		password,
		10
	);
}

// COMPARE PASSWORD
export async function comparePassword(
	password: string,
	hash: string
) {

	return await bcrypt.compare(
		password,
		hash
	);
}

// CREATE ADMIN
export async function createUser(
	username: string,
	password: string
) {

	const hashed =
		await hashPassword(
			password
		);

	await db.execute({
		sql: `
			INSERT INTO admin
			(
				username,
				password
			)
			VALUES (?, ?)
		`,

		args: [
			username,
			hashed
		]
	});
}