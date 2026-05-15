<script lang="ts">
	import { toast } from "svelte-sonner";

	let { data } = $props();

	let {
		id,
		nama,
		tahun_lulus,
		alamat,
		pekerjaan
	} = data.alumni;

	let loading = false;
	let formError = "";

	let errors: any = {};

	function hasError(
		field: string
	) {
		return errors[field];
	}

	function getPlaceholder(
		field: string,
		defaultText: string
	) {

		if (
			hasError(field)
		) {
			return "Isi kolom ini";
		}

		return defaultText;
	}

	async function submitForm() {

		errors = {};
		formError = "";
		loading = true;

		const res =
			await fetch(
				"/api/alumni",
				{
					method: "PUT",

					headers: {
						"Content-Type":
							"application/json"
					},

					body: JSON.stringify(
						{
							id,
							nama,
							tahun_lulus,
							alamat,
							pekerjaan
						}
					)
				}
			);

		const result =
			await res.json();
		console.log(result);

		if (!res.ok) {
			errors =
				result.errors
					?.fieldErrors || {};
			formError =
				result.message ||
				"Periksa kembali form";

			toast.error(formError);

			loading = false;
			return;
		}

		toast.success(
			"Data alumni berhasil diupdate"
		);

		window.location.href =
			"/alumni";
	}
</script>

<h1 class="text-3xl font-bold mb-6">
	Edit Alumni
</h1>

{#if formError}
	<div class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
		<p class="font-semibold">Terjadi kesalahan:</p>
		<p>{formError}</p>
	</div>
{/if}

<div class="max-w-2xl bg-white shadow rounded-2xl p-6">

	<!-- NAMA -->
	<div class="mb-5">

		<label class="block mb-2 font-semibold">
			Nama Alumni
		</label>

		<input
			bind:value={nama}
			placeholder={getPlaceholder(
				"nama",
				"Nama alumni"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("nama")
				? "border-red-500 bg-red-50 placeholder:text-red-400"
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
			placeholder={getPlaceholder(
				"tahun_lulus",
				"2026"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("tahun_lulus")
				? "border-red-500 bg-red-50 placeholder:text-red-400"
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
			placeholder={getPlaceholder(
				"alamat",
				"Alamat alumni"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("alamat")
				? "border-red-500 bg-red-50 placeholder:text-red-400"
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
			placeholder={getPlaceholder(
				"pekerjaan",
				"Pekerjaan alumni"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("pekerjaan")
				? "border-red-500 bg-red-50 placeholder:text-red-400"
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
		class="w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50"
	>

		{#if loading}
			Menyimpan...
		{:else}
			Update Alumni
		{/if}

	</button>

</div>