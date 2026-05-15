<script lang="ts">
	import { toast } from "svelte-sonner";

	let nama = "";
	let tahun_lulus = "";
	let alamat = "";
	let pekerjaan = "";

	let loading = false;

	let errors: any = {};

	function hasError(
		field: string
	) {
		return errors[field];
	}

	async function submitForm() {

		errors = {};
		loading = true;

		const res =
			await fetch(
				"/api/alumni",
				{
					method: "POST",

					headers: {
						"Content-Type":
							"application/json"
					},

					body: JSON.stringify(
						{
							nama,
							tahun_lulus,
							alamat,
							pekerjaan
						}
					)
				}
			);

		const data =
			await res.json();

		if (!res.ok) {

			errors =
				data.errors
					?.fieldErrors || {};

			toast.error(
				"Periksa form kembali"
			);

			loading = false;
			return;
		}

		toast.success(
			"Alumni berhasil ditambahkan"
		);

		window.location.href =
			"/alumni";
	}
</script>

<h1 class="text-3xl font-bold mb-6">
	Tambah Alumni
</h1>

<div class="max-w-2xl bg-white shadow rounded-2xl p-6">

	<!-- NAMA -->
	<div class="mb-5">

		<label class="block mb-2 font-semibold">
			Nama Alumni
		</label>

		<input
			bind:value={nama}
			placeholder="Nama alumni"
			class={`w-full border rounded-xl px-4 py-3
			${
				hasError("nama")
				? "border-red-500 bg-red-50"
				: "border-gray-300"
			}`}
		/>

		{#if hasError("nama")}

			<p class="text-red-500 text-sm mt-2">
				{errors.nama[0]}
			</p>

		{/if}

	</div>

	<!-- TAHUN -->
	<div class="mb-5">

		<label class="block mb-2 font-semibold">
			Tahun Lulus
		</label>

		<input
			bind:value={tahun_lulus}
			placeholder="2026"
			class={`w-full border rounded-xl px-4 py-3
			${
				hasError("tahun_lulus")
				? "border-red-500 bg-red-50"
				: "border-gray-300"
			}`}
		/>

		{#if hasError("tahun_lulus")}

			<p class="text-red-500 text-sm mt-2">
				{errors.tahun_lulus[0]}
			</p>

		{/if}

	</div>

	<!-- ALAMAT -->
	<div class="mb-5">

		<label class="block mb-2 font-semibold">
			Alamat
		</label>

		<textarea
			rows="4"
			bind:value={alamat}
			placeholder="Alamat alumni"
			class={`w-full border rounded-xl px-4 py-3
			${
				hasError("alamat")
				? "border-red-500 bg-red-50"
				: "border-gray-300"
			}`}
		/>

		{#if hasError("alamat")}

			<p class="text-red-500 text-sm mt-2">
				{errors.alamat[0]}
			</p>

		{/if}

	</div>

	<!-- PEKERJAAN -->
	<div class="mb-8">

		<label class="block mb-2 font-semibold">
			Pekerjaan
		</label>

		<input
			bind:value={pekerjaan}
			placeholder="Pekerjaan alumni"
			class={`w-full border rounded-xl px-4 py-3
			${
				hasError("pekerjaan")
				? "border-red-500 bg-red-50"
				: "border-gray-300"
			}`}
		/>

		{#if hasError("pekerjaan")}

			<p class="text-red-500 text-sm mt-2">
				{errors.pekerjaan[0]}
			</p>

		{/if}

	</div>

	<button
		on:click={submitForm}
		disabled={loading}
		class="w-full bg-black text-white py-3 rounded-xl font-semibold"
	>

		{#if loading}
			Menyimpan...
		{:else}
			Simpan Alumni
		{/if}

	</button>

</div>