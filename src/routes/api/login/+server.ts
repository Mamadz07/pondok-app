import { db } from "$lib/server/db";
import { comparePassword } from "$lib/server/auth";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const { username, password } =
    await request.json();

  const result = await db.execute({
    sql: `
      SELECT * FROM users
      WHERE username = ?
    `,
    args: [username]
  });

  const user = result.rows[0];

  if (!user) {
    return json(
      {
        success: false,
        message: "User not found"
      },
      { status: 401 }
    );
  }

  const valid = await comparePassword(
    password,
    user.password as string
  );

  if (!valid) {
    return json(
      {
        success: false,
        message: "Wrong password"
      },
      { status: 401 }
    );
  }

  cookies.set("session", JSON.stringify({
    id: user.id,
    username: user.username,
    role: user.role
  }), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: 60 * 60 * 24
  });

  return json({
    success: true,
    role: user.role
  });
}