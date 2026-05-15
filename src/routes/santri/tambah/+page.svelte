<script lang="ts">
	import { toast } from "svelte-sonner";

	let nama = "";
	let tempat_lahir = "";
	let tanggal_lahir = "";
	let alamat = "";
	let nama_wali = "";
	let no_hp_wali = "";
	let tanggal_masuk = "";
	let status = "Aktif";

	let loading = false;

	let errors: any = {};

	function hasError(field: string) {
		return errors[field];
	}

	function getPlaceholder(
		field: string,
		defaultText: string
	) {
		if (hasError(field)) {
			return "Isi kolom ini";
		}

		return defaultText;
	}

	async function submitForm() {
		errors = {};
		loading = true;

		try {
			const res = await fetch(
				"/api/santri",
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
						no_hp_wali,
						tanggal_masuk,
						status
					})
				}
			);

			const data =
				await res.json();

			if (!res.ok) {
				errors =
					data.errors
						?.fieldErrors || {};

				toast.error(
					"Periksa kembali form"
				);

				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});

				loading = false;
				return;
			}

			toast.success(
				"Santri berhasil ditambahkan"
			);

			window.location.href =
				"/santri";

		} catch (err) {
			console.error(err);

			toast.error(
				"Terjadi kesalahan server"
			);

			loading = false;
		}
	}
</script>

<h1 class="text-3xl font-bold mb-6">
	Tambah Santri
</h1>

<!-- ERROR SUMMARY -->
{#if Object.keys(errors).length > 0}

	<div class="mb-6 bg-red-50 border border-red-200 rounded-2xl p-5">

		<h2 class="text-red-600 font-semibold mb-3">
			Periksa kembali input berikut:
		</h2>

		<ul class="space-y-2 text-sm">

			{#each Object.entries(errors) as [field, msgs]}

				<li class="text-red-500">
					•
					<strong>
						{field}
					</strong>
					:
					{msgs[0]}
				</li>

			{/each}

		</ul>

	</div>

{/if}

<!-- FORM -->
<div class="max-w-2xl bg-white shadow rounded-2xl p-6">

	<!-- NAMA -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Nama Santri
		</label>

		<input
			bind:value={nama}
			placeholder={getPlaceholder(
				"nama",
				"Masukkan nama santri"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition placeholder:text-sm
			${
				hasError("nama")
				? "border-red-500 bg-red-50 placeholder:text-red-400 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("nama")}
			<p class="text-red-500 text-sm mt-2">
				{errors.nama[0]}
			</p>
		{/if}

	</div>

	<!-- TEMPAT LAHIR -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Tempat Lahir
		</label>

		<input
			bind:value={tempat_lahir}
			placeholder={getPlaceholder(
				"tempat_lahir",
				"Masukkan tempat lahir"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition placeholder:text-sm
			${
				hasError("tempat_lahir")
				? "border-red-500 bg-red-50 placeholder:text-red-400 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("tempat_lahir")}
			<p class="text-red-500 text-sm mt-2">
				{errors.tempat_lahir[0]}
			</p>
		{/if}

	</div>

	<!-- TANGGAL LAHIR -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Tanggal Lahir
		</label>

		<input
			type="date"
			bind:value={tanggal_lahir}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("tanggal_lahir")
				? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("tanggal_lahir")}
			<p class="text-red-500 text-sm mt-2">
				{errors.tanggal_lahir[0]}
			</p>
		{/if}

	</div>

	<!-- ALAMAT -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Alamat
		</label>

		<textarea
			rows="4"
			bind:value={alamat}
			placeholder={getPlaceholder(
				"alamat",
				"Masukkan alamat"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition placeholder:text-sm
			${
				hasError("alamat")
				? "border-red-500 bg-red-50 placeholder:text-red-400 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("alamat")}
			<p class="text-red-500 text-sm mt-2">
				{errors.alamat[0]}
			</p>
		{/if}

	</div>

	<!-- NAMA WALI -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Nama Wali
		</label>

		<input
			bind:value={nama_wali}
			placeholder={getPlaceholder(
				"nama_wali",
				"Masukkan nama wali"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition placeholder:text-sm
			${
				hasError("nama_wali")
				? "border-red-500 bg-red-50 placeholder:text-red-400 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("nama_wali")}
			<p class="text-red-500 text-sm mt-2">
				{errors.nama_wali[0]}
			</p>
		{/if}

	</div>

	<!-- NO HP -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			No HP Wali
		</label>

		<input
			bind:value={no_hp_wali}
			placeholder={getPlaceholder(
				"no_hp_wali",
				"08xxxxxxxxxx"
			)}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition placeholder:text-sm
			${
				hasError("no_hp_wali")
				? "border-red-500 bg-red-50 placeholder:text-red-400 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("no_hp_wali")}
			<p class="text-red-500 text-sm mt-2">
				{errors.no_hp_wali[0]}
			</p>
		{/if}

	</div>

	<!-- TANGGAL MASUK -->
	<div class="mb-5">

		<label class="block font-semibold mb-2">
			Tanggal Masuk
		</label>

		<input
			type="date"
			bind:value={tanggal_masuk}
			class={`w-full border rounded-xl px-4 py-3 outline-none transition
			${
				hasError("tanggal_masuk")
				? "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-200"
				: "border-gray-300 focus:ring-4 focus:ring-black/10"
			}`}
		/>

		{#if hasError("tanggal_masuk")}
			<p class="text-red-500 text-sm mt-2">
				{errors.tanggal_masuk[0]}
			</p>
		{/if}

	</div>

	<!-- STATUS -->
	<div class="mb-8">

		<label class="block font-semibold mb-2">
			Status
		</label>

		<select
			bind:value={status}
			class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-black/10"
		>
			<option value="Aktif">
				Aktif
			</option>

			<option value="Alumni">
				Alumni
			</option>

			<option value="Keluar">
				Keluar
			</option>
		</select>

	</div>

	<!-- BUTTON -->
	<button
		on:click={submitForm}
		disabled={loading}
		class="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
	>

		{#if loading}
			Menyimpan...
		{:else}
			Simpan Data
		{/if}

	</button>

</div>