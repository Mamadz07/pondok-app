<script lang="ts">
	import { toast } from "svelte-sonner";

	let nama = "";
	let tempat_lahir = "";
	let tanggal_lahir = "";
	let alamat = "";
	let nama_wali = "";
	let no_hp_wali = "";

	let loading = false;

	async function submitForm() {

		loading = true;

		const res =
			await fetch(
				"/api/pendaftar",
				{
					method: "POST",

					headers: {
						"Content-Type":
							"application/json"
					},

					body: JSON.stringify({
						nama,
						tempat_lahir,
						tanggal_lahir,
						alamat,
						nama_wali,
						no_hp_wali
					})
				}
			);

		const result =
			await res.json();

		if (!res.ok) {

			toast.error(
				"Form belum lengkap"
			);

			loading = false;
			return;
		}

		toast.success(
			"Pendaftaran berhasil dikirim"
		);

		window.location.href =
			"/";
	}
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center p-5">

	<div class="w-full max-w-2xl bg-white shadow rounded-2xl p-6">

		<h1 class="text-3xl font-bold mb-6">
			Pendaftaran Santri
		</h1>

		<div class="space-y-5">

			<input
				bind:value={nama}
				placeholder="Nama lengkap"
				class="w-full border rounded-xl px-4 py-3"
			/>

			<input
				bind:value={tempat_lahir}
				placeholder="Tempat lahir"
				class="w-full border rounded-xl px-4 py-3"
			/>

			<input
				type="date"
				bind:value={tanggal_lahir}
				class="w-full border rounded-xl px-4 py-3"
			/>

			<textarea
				rows="4"
				bind:value={alamat}
				placeholder="Alamat lengkap"
				class="w-full border rounded-xl px-4 py-3"
			/>

			<input
				bind:value={nama_wali}
				placeholder="Nama wali"
				class="w-full border rounded-xl px-4 py-3"
			/>

			<input
				bind:value={no_hp_wali}
				placeholder="08xxxxxxxxxx"
				class="w-full border rounded-xl px-4 py-3"
			/>

			<button
				on:click={submitForm}
				disabled={loading}
				class="w-full bg-black text-white py-3 rounded-xl"
			>

				{#if loading}
					Mengirim...
				{:else}
					Daftar Sekarang
				{/if}

			</button>

		</div>

	</div>

</div>