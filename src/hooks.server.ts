import { redirect } from "@sveltejs/kit";

export async function handle({
  event,
  resolve
}) {
  const session =
    event.cookies.get("session");

  if (session) {
    event.locals.user =
      JSON.parse(session);
  }

  const protectedRoutes = [
    "/dashboard",
    "/santri",
    "/alumni",
    "/pendaftar"
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      event.url.pathname.startsWith(route)
    );

  if (
    isProtected &&
    !event.locals.user
  ) {
    throw redirect(302, "/login");
  }

  return resolve(event);
}