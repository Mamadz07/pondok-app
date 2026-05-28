import { createUser } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export async function GET() {

	await createUser(
		'admin',
		'admin123'
	);

	return json({
		success: true,
		message: 'Admin created'
	});
}