import { createClient } from "@libsql/client";
import { env } from "$env/dynamic/private";

console.log("TURSO_DATABASE_URL =", env.TURSO_DATABASE_URL);
console.log("TURSO_AUTH_TOKEN =", env.TURSO_AUTH_TOKEN ? "ADA" : "TIDAK ADA");

if (!env.TURSO_DATABASE_URL) {
	throw new Error("TURSO_DATABASE_URL tidak ditemukan");
}

if (!env.TURSO_AUTH_TOKEN) {
	throw new Error("TURSO_AUTH_TOKEN tidak ditemukan");
}

export const db = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});