import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({
	event,
	resolve
}) => {
	const session =
		event.cookies.get('session');

	// ambil user dari cookie
	if (session) {
		event.locals.user =
			JSON.parse(session);
	}

	// route yang harus login
	const protectedRoutes = [
		'/dashboard',
		'/santri',
		'/alumni',
		'/pendaftar'
	];

	const isProtected =
		protectedRoutes.some((route) =>
			event.url.pathname.startsWith(route)
		);

	// belum login
	if (
		isProtected &&
		!event.locals.user
	) {
		throw redirect(302, '/login');
	}

	// sudah login tapi buka login lagi
	if (
		event.locals.user &&
		event.url.pathname === '/login'
	) {
		throw redirect(302, '/dashboard');
	}

	return resolve(event);
};