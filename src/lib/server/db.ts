import { createClient } from "@libsql/client";
import { env } from "$env/dynamic/private";

console.log(env.TURSO_DATABASE_URL);

export const db = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN
});