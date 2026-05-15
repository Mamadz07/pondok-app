import { z } from "zod";

export const santriSchema = z.object({
	nama: z
		.string()
		.min(1, "Nama wajib diisi")
		.min(3, "Nama minimal 3 karakter"),

	tempat_lahir: z
		.string()
		.min(1, "Tempat lahir wajib diisi"),

	tanggal_lahir: z
		.string()
		.min(1, "Tanggal lahir wajib diisi"),

	alamat: z
		.string()
		.min(1, "Alamat wajib diisi")
		.min(5, "Alamat terlalu pendek"),

	nama_wali: z
		.string()
		.min(1, "Nama wali wajib diisi"),

	no_hp_wali: z
		.string()
		.min(1, "No HP wajib diisi")
		.min(10, "No HP minimal 10 digit"),

	tanggal_masuk: z
		.string()
		.min(1, "Tanggal masuk wajib diisi"),

	status: z
		.string()
		.min(1, "Status wajib dipilih")
});