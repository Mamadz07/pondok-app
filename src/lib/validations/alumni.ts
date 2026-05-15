import { z } from "zod";

export const alumniSchema = z.object({
	nama: z
		.string()
		.min(1, "Nama wajib diisi"),

	tahun_lulus: z
		.union([
			z.string(),
			z.number()
		]),

	alamat: z
		.string()
		.min(1, "Alamat wajib diisi"),

	pekerjaan: z
		.string()
		.min(1, "Pekerjaan wajib diisi")
});

export const updateAlumniSchema =
	alumniSchema.extend({
		id: z.union([
			z.string(),
			z.number()
		])
	});